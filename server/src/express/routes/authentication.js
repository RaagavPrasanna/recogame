import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import session from 'express-session';
import { isAuthenticated, csrfProtect } from '../utils.js';
import passport from 'passport';
import passportSteam from 'passport-steam';

const SteamStrategy = passportSteam.Strategy;
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const users = new Array();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new SteamStrategy({
  // Must be changed when deployed
  returnURL: 'http://localhost:3001/authentication/steam-auth/return',
  // Must be changed when deployed
  realm: 'http://localhost:3001/',
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

  const user = { name, email, picture, provider: 'google' };


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
router.get('/steam-auth', passport.authenticate('steam', { failureRedirect: 'localhost:3000/' }), (req, res) => {
  res.redirect('http://localhost:3000/');
});

// Change redirect urls when deployed
router.get('/steam-auth/return', passport.authenticate('steam', { failureRedirect: 'localhost:3000/' }), (req, res) => {
  console.log('in return');
  req.session.regenerate((err) => {
    if(err) {
      return res.sendStatus(500);
    }
    req.session.user = req.user;
    console.log('set session user');
    console.log(req.session.user);
    res.redirect('http://localhost:3000/');
  });
});

router.get('/get-user', isAuthenticated, function(req, res) {
  res.json(req.session.user);
});

router.get('/logout', isAuthenticated, function(req, res) {
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

// Must be requested by client everytime a post request is made
router.get('/csrf-token', isAuthenticated, csrfProtect.csrfSynchronisedProtection, (req, res) => {
  res.json({ token: csrfProtect.generateToken(req) });
});
export default router;