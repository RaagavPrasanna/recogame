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

passport.use(new SteamStrategy({
  // Must be changed when deployed
  returnURL: `${process.env.HOST_URL}authentication/steam-auth/return`,
  // Must be changed when deployed
  realm: process.env.HOST_URL,
  apiKey: process.env.STEAM_API_KEY
}, function (identifier, profile, done) {
  process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));

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

router.use(passport.initialize());
router.use(passport.session());

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

  if(existingUser === null) {
    user.firstLogin = true;
    await models.UserProfile.create({
      userId: user.email, profileName: user.name,
      profilePicture: user.picture, accountType: user.provider
    });
  }else if(Object.keys(existingUser.preferences).every((key) => {
    if(Array.isArray(existingUser.preferences[key])) {
      return existingUser.preferences[key].length === 0;
    } else {
      return true;
    }
  })){
    user.firstLogin = true;
  }


  req.session.regenerate((err) => {
    if(err) {
      return res.sendStatus(500);
    }
    req.session.user = user;
    res.json(user);
  });
});

// Change urls when deployed
router.get('/steam-auth', passport.authenticate('steam', { failureRedirect: process.env.REDIRECT_URL }), (_, res) => {
  res.redirect(process.env.REDIRECT_URL);
});

// Change redirect urls when deployed
router.get('/steam-auth/return',
  passport.authenticate('steam', { failureRedirect: process.env.REDIRECT_URL }), async (req, res) => {
    req.session.regenerate(async (err) => {
      if(err) {
        return res.sendStatus(500);
      }

      req.user.firstLogin = false;


      const existingUser = await models.UserProfile.findOne({ userId: req.user._json.steamid });

      if(existingUser === null) {
        req.user.firstLogin = true;
        await models.UserProfile.create({
          userId: req.user._json.steamid, profileName: req.user._json.personaname,
          profilePicture: req.user._json.avatarfull, accountType: req.user.provider
        });
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
      if(req.session.user.firstLogin) {
        res.redirect(process.env.REDIRECT_URL + 'firstLogin');
      } else {
        res.redirect(process.env.REDIRECT_URL);
      }
    });
  });

router.get('/get-user', utils.authentication.isAuthenticated, function(req, res) {
  res.status(200).json(req.session.user);
});

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

// Must be requested by client every time a post request is made
router.get(
  '/csrf-token',
  utils.authentication.isAuthenticated,
  (req, res) => {
    res.json({ token: utils.authentication.csrfProtect.generateToken(req) });
  }
);

router.get('/user-steam-games', utils.authentication.isAuthenticated, async (req, res) => {
  if(req.session.user.provider !== 'steam') {
    res.status(400).send('User is not logged in with steam');
    return;
  }

  const steamId = req.session.user.id;

  // eslint-disable-next-line max-len
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}`;

  const response = await fetch(url);
  const data = await response.json();

  if(!('games' in data.response)) {
    res.status(404).send('User has no games. Check account privacy settings or add games to account.');
    return;
  }

  const games = [];

  await Promise.all(
    data.response.games.map(async (gameId) => {
      let game = await utils.retrieveData.getGameById(gameId.appid);
      if(game === null) {
        try {
          const deprecated = await models.DeprecatedGames.findOne({ sourceId: gameId.appid });
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

    const validateData = async () => {

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

      let gameData = await models.GameDetails.distinct('_id');
      gameData = gameData.map((game) => game.toString());

      console.log(gameData);

      if(!checkCollection(gameData, 'playedGames')) {
        return false;
      }

      const platformsData = await models.GameDetails
        .find()
        .distinct('platforms', { platforms: { $nin: ['', null] } });

      console.log(platformsData);

      if(!checkCollection(platformsData, 'platforms')) {
        return false;
      }

      const genresData = await models.GameDetails
        .find()
        .distinct('genres', { genres: { $nin: ['', null] } });

      console.log(genresData);

      if(!checkCollection(genresData, 'genres')) {
        return false;
      }

      const categoriesData = await models.GameDetails
        .find()
        .distinct('categories', { categories: { $nin: ['', null] } });

      console.log(categoriesData);

      if(!checkCollection(categoriesData, 'categories')) {
        return false;
      }

      return true;
    };

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

    // Generate new token to prevent CSRF attack via the same token
    console.log(utils.authentication.csrfProtect.generateToken(req));
    res.sendStatus(200);
  });



export default router;

