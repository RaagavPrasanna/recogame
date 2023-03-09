import express from 'express';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import passport from 'passport';
import passportSteam from 'passport-steam';
import models from '../../db/models.js';
import utils from '../utils.js';

const SteamStrategy = passportSteam.Strategy;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();
const users = new Array();

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
    maxAge: 120000,
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
  }

  if(!users.some(u => u.email === user.email)) {
    users.push(user);
  }

  req.session.regenerate((err) => {
    if(err) {
      return res.sendStatus(500);
    }
    req.session.user = user;
    res.json({ user: user });
  });
});

// Change urls when deployed
router.get('/steam-auth', passport.authenticate('steam', { failureRedirect: process.env.REDIRECT_URL }), (_, res) => {
  res.redirect(process.env.REDIRECT_URL);
});

// Change redirect urls when deployed
router.get('/steam-auth/return',
  passport.authenticate('steam', { failureRedirect: process.env.REDIRECT_URL }), async (req, res) => {
    console.log('in return');
    req.session.regenerate(async (err) => {
      if(err) {
        return res.sendStatus(500);
      }

      req.user.firstLogin = false;


      const existingUser = await models.UserProfile.findOne({ userId: req.user._json.steamid });

      console.log(existingUser);

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
        console.log('empty preferences');
        console.log(existingUser.preferences);
      }
      req.session.user = req.user;
      console.log('set session user');
      console.log(req.session.user);
      res.redirect(process.env.REDIRECT_URL);
    });
  });

router.get('/get-user', utils.authentication.isAuthenticated, function(req, res) {
  res.json(req.session.user);
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
  utils.authentication.csrfProtect.csrfSynchronisedProtection,
  (req, res) => {
    res.json({ token: utils.authentication.csrfProtect.generateToken(req) });
  }
);

export default router;

