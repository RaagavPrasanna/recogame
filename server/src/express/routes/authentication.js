import express from 'express';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import passport from 'passport';
import passportSteam from 'passport-steam';
import models from '../../db/models.js';
import utils from '../utils.js';
import steam from '../../controller/steamapi/steam_api.js';


const SteamStrategy = passportSteam.Strategy;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initialize passport middleware for Steam authentication
passport.use(new SteamStrategy({
  returnURL: `${process.env.HOST_URL}authentication/steam-auth/return`,
  realm: process.env.HOST_URL,
  apiKey: process.env.STEAM_API_KEY
}, function (identifier, profile, done) {
  process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));

// Middleware for user cookie
router.use(session({
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie : {
    maxAge: 1200000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

// Post request for google authentication
router.post('/google-auth', async (req, res) => {
  if(req.body === undefined) {
    return res.sendStatus(400);
  }
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  if(!ticket) {
    return res.sendStatus(401);
  }
  const { name, email, picture } = ticket.getPayload();

  const user = { name, email, picture, provider: 'google', firstLogin: false };

  const existingUser = await models.UserProfile.findOne({ userId: user.email });

  // If user is logging in for the first time, create a new user profile
  if(existingUser === null) {
    user.firstLogin = true;
    await models.UserProfile.create({
      userId: user.email, profileName: user.name,
      profilePicture: user.picture, accountType: user.provider
    });
  // If user has logged in before, check if they have any preferences, if not, set firstLogin to true
  }else if(Object.keys(existingUser.preferences).every((key) => {
    if(Array.isArray(existingUser.preferences[key])) {
      return existingUser.preferences[key].length === 0;
    } else {
      return true;
    }
  })){
    user.firstLogin = true;
  }

  // Generation user session cookie
  req.session.regenerate((err) => {
    if(err) {
      return res.sendStatus(500);
    }
    req.session.user = user;
    res.json(user);
  });
});

// Redirects back to client after login
router.get('/steam-auth', passport.authenticate('steam', { failureRedirect: process.env.REDIRECT_URL }), (_, res) => {
  res.redirect(process.env.REDIRECT_URL);
});

// Request for steam authentication
router.get('/steam-auth/return',
  passport.authenticate('steam', { failureRedirect: process.env.REDIRECT_URL }), async (req, res) => {
    req.session.regenerate(async (err) => {
      if(err) {
        return res.sendStatus(500);
      }

      req.user.firstLogin = false;


      const existingUser = await models.UserProfile.findOne({ userId: req.user._json.steamid });

      // If user is logging in for the first time, create a new user profile
      if(existingUser === null) {
        req.user.firstLogin = true;
        await models.UserProfile.create({
          userId: req.user._json.steamid, profileName: req.user._json.personaname,
          profilePicture: req.user._json.avatarfull, accountType: req.user.provider
        });
      // If user has logged in before, check if they have any preferences, if not, set firstLogin to true
      } else if(Object.keys(existingUser.preferences).every((key) => {
        if(Array.isArray(existingUser.preferences[key])) {
          return existingUser.preferences[key].length === 0;
        } else {
          return true;
        }
      })){
        req.user.firstLogin = true;
      }
      req.session.user = req.user;
      console.log('set session user');
      console.log(req.session.user);
      // Redirect to firstLogin endpoint if it is the user first time logging in. Otherwise, redirect to home page
      if(req.session.user.firstLogin) {
        res.redirect(process.env.REDIRECT_URL + 'firstLogin');
      } else {
        res.redirect(process.env.REDIRECT_URL);
      }
    });
  });

// Endpoint to retrieve the signed in user
router.get('/get-user', utils.authentication.isAuthenticated, function(req, res) {
  res.status(200).json(req.session.user);
});

// Logout route the signs the user out and destroys the cookie
router.get('/logout', utils.authentication.isAuthenticated, function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.clearCookie('id');
    console.log(req.user);
    return res.sendStatus(200);
  });
});

// Raagav's Champion Feature
// Must be requested by client every time a post request is made and passed in the header
// In post route, the csrfSynchronisedProtection middleware must be used, which validates the passed token
// Ideally, the token would need to be revoked at the end of the post request, but this was not able to be implemented
router.get(
  '/csrf-token',
  utils.authentication.isAuthenticated,
  (req, res) => {
    res.json({ token: utils.authentication.csrfProtect.generateToken(req) });
  }
);

// Route to retrieve the user's steam games
router.get('/user-steam-games', utils.authentication.isAuthenticated, async (req, res) => {
  if(req.session.user.provider !== 'steam') {
    res.status(400).send('User is not logged in with steam');
    return;
  }

  const steamId = req.session.user.id;

  // Url endpoint to retrieve user's steam games
  // eslint-disable-next-line max-len
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}`;

  const response = await fetch(url);
  const data = await response.json();

  // If user has no games, return 404
  if(!('games' in data.response)) {
    res.status(404).send('User has no games. Check account privacy settings or add games to account.');
    return;
  }

  const games = [];

  await Promise.all(
    data.response.games.map(async (gameId) => {
      // First check if the game exists in the database
      let game = await utils.retrieveData.getGameById(gameId.appid);
      if(game === null) {
        try {
          // If it doesn't, we are first going to check if the game is deprecated
          const deprecated = await models.DeprecatedGames.findOne({ sourceId: gameId.appid });
          // If the game isn't deprecated, we are going to push it to our db
          if(deprecated === null) {
            game = await steam.fetchGameInfo(gameId.appid);
            await utils.pushData.pushGameToDB(game);
            game = await utils.retrieveData.getGameById(gameId.appid);
            console.log('new game added to db');
            games.push(game);
          } else {
            console.log(`Game ${gameId.appid} is deprecated`);
          }
        } catch (err) {
          if(game === null) {
            // If the game is not able to be fetched, add it the deprecated games collection
            console.log(`Game ${gameId.appid} not found, adding to deprectated games`);
            await models.DeprecatedGames.create({ sourceId: gameId.appid });
          } else {
            console.error(err);
          }
        }
      } else {
        games.push(game);
      }
    }
    ));

  res.status(200).json(games);
});

// Route to update the user's preferences
router.post('/update-user-preferences',
  utils.authentication.isAuthenticated,
  utils.authentication.csrfProtect.csrfSynchronisedProtection, async (req, res) => {

    if(typeof req.body !== 'object') {
      res.status(400).send('Invalid request');
      return;
    } else if(Object.keys(req.body).length !== 4) {
      res.status(400).send('Invalid request');
      return;
    }

    // Function to validate the data sent in the request
    const validateData = async () => {

      // Function to check if the data in the request is in the correct format
      const checkCollection = (struct, key) => {
        req.body[key].forEach((item) => {
          if(typeof (item) !== 'string') {
            return false;
          } else if(!struct.includes(item)) {
            return false;
          }
        });
        return true;
      };

      // Verify the integrity of the data sent in the request

      let gameData = await models.GameDetails.distinct('_id');
      gameData = gameData.map((game) => game.toString());


      if(!checkCollection(gameData, 'playedGames')) {
        return false;
      }

      const platformsData = await models.GameDetails
        .find()
        .distinct('platforms', { platforms: { $nin: ['', null] } });


      if(!checkCollection(platformsData, 'platforms')) {
        return false;
      }

      const genresData = await models.GameDetails
        .find()
        .distinct('genres', { genres: { $nin: ['', null] } });


      if(!checkCollection(genresData, 'genres')) {
        return false;
      }

      const categoriesData = await models.GameDetails
        .find()
        .distinct('categories', { categories: { $nin: ['', null] } });


      if(!checkCollection(categoriesData, 'categories')) {
        return false;
      }

      return true;
    };

    // More data integrity checks
    for (const key in req.body) {
      if(!(['playedGames', 'platforms', 'genres', 'categories'].includes(key))) {
        console.log('not valid key');
        res.status(400).send('Invalid request');
        return;
      } else if(!(Array.isArray(req.body[key]))) {
        console.log('not array');
        res.status(400).send('Invalid request');
        return;
      } else if(!(await validateData())) {
        console.log('not valid data');
        res.status(400).send('Invalid request');
        return;
      }
    }

    const playedGames = req.body.playedGames.map((game) => game.id);

    // Update the user's preferences
    if(req.session.user.provider === 'steam') {
      console.log('starting update steam');
      await models.UserProfile.updateOne({ userId: req.session.user.id },
        {
          $set: {
            preferences: {
              playedGames: playedGames,
              platforms: req.body.platforms,
              genres: req.body.genres,
              categories: req.body.categories,
              wishlist: [],
              receiveMsgs: true,
              enableFriendRecs: true,
              enableGameRecs: true
            }
          }
        });
      console.log('done update ssteam');
    } else {
      console.log('starting update google');
      await models.UserProfile.updateOne({ userId: req.session.user.email },
        {
          $set: {
            preferences: {
              playedGames: playedGames,
              platforms: req.body.platforms,
              genres: req.body.genres,
              categories: req.body.categories,
              wishlist: [],
              receiveMsgs: true,
              enableFriendRecs: true,
              enableGameRecs: true
            }
          }
        });
      console.log('done update google');
    }

    res.sendStatus(200);
  });

const validateGame = async (game) => {
  if(typeof game !== 'object') {
    return false;
  } else if(Object.keys(game).length !== 1) {
    return false;
  } else if(Object.keys(game)[0] !== 'id') {
    return false;
  }

  const gameId = game.id;
  if(typeof gameId !== 'string') {
    return false;
  }

  let gameData = await models.GameDetails.distinct('_id');
  gameData = gameData.map((game) => game.toString());

  if(!gameData.includes(gameId)) {
    return false;
  }

  return true;
};

const getDbUser = async (req) => {
  let user = null;
  if(req.session.user.provider === 'steam') {
    user = await models.UserProfile.findOne({ userId: req.session.user.id });

  } else if(req.session.user.provider === 'google') {
    user = await models.UserProfile.findOne({ userId: req.session.user.email });
  }
  return user;
};

const updateWishlist = async (user) => {
  await models.UserProfile.updateOne(
    { userId: user.userId },
    { $set: { preferences: user.preferences } }
  );
};

router.post('/add-to-wishlist', utils.authentication.isAuthenticated,
  utils.authentication.csrfProtect.csrfSynchronisedProtection, async (req, res) => {
    console.log('add to wishlist');
    const game = req.body;
    if(validateGame(game)) {
      const user = await getDbUser(req);
      if(user === null) {
        res.status(400).send('Invalid request');
        return;
      }

      if(user.preferences.wishlist.includes(game.id)) {
        res.status(400).send('Invalid request');
        return;
      }

      user.preferences.wishlist.push(game.id);

      try {
        await updateWishlist(user);
        res.sendStatus(200);
        return;
      } catch (err) {
        res.status(500).send('Internal server error');
      }
      return;
    } else {
      console.log('invalid game');
      res.status('400').send('Invalid request');
    }
  });

router.post('/remove-from-wishlist', utils.authentication.isAuthenticated,
  utils.authentication.csrfProtect.csrfSynchronisedProtection, async (req, res) => {
    console.log('remove from wishlist');
    const game = req.body;
    if(validateGame(game)) {
      const user = await getDbUser(req);
      if(user === null) {
        res.status(400).send('Invalid request');
        return;
      }

      if(!user.preferences.wishlist.includes(game.id)) {
        res.status(400).send('Invalid request');
        return;
      }

      const gameInd = user.preferences.wishlist.indexOf(game.id);
      if(gameInd === -1) {
        res.status(400).send('Invalid request');
        return;
      }

      user.preferences.wishlist.splice(gameInd, 1);

      try {
        await updateWishlist(user);
        res.sendStatus(200);
        return;
      } catch (err) {
        res.status(500).send('Internal server error');
      }
      return;
    } else {
      console.log('invalid game');
      res.status('400').send('Invalid request');
    }
  });

router.get('/check-wishlist/:id', utils.authentication.isAuthenticated, async (req, res) => {
  const user = await getDbUser(req);
  if(user === null) {
    res.status(400).send('Invalid request');
    return;
  }

  const gameId = req.params.id;
  if(typeof gameId !== 'string') {
    res.status(400).send('Invalid request');
    return;
  }

  if(user.preferences.wishlist.includes(gameId)) {
    res.sendStatus(200);
    return;
  } else {
    res.sendStatus(404);
    return;
  }
});

export default router;

