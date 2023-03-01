import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import session from 'express-session';
import { isAuthenticated, csrfProtect } from '../utils.js';
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const users = new Array();


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

router.post('/auth', async (req, res) => {
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

  const user = { 'name': name, 'email': email, 'picture': picture };
  const existsAlready = users.find(u => u.email === user.email);

  if(existsAlready) {
    users.push(user);
  } else {
    users[existsAlready] = user;
  }

  req.session.regenerate(function(err) {
    if(err) {
      return res.sendStatus(500);
    }
    req.session.user = user;
    res.json({ user: user });
  });
});

router.get('/protected', isAuthenticated, function(req, res) {
  res.sendStatus(200);
});

router.get('/logout', isAuthenticated, function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      return res.sendStatus(500);
    }
    res.clearCookie('id');
    res.sendStatus(200);
  });
});

// Must be requested by client everytime a post request is made
router.get('/csrf-token', isAuthenticated, csrfProtect.csrfSynchronisedProtection, (req, res) => {
  res.json({ token: csrfProtect.generateToken(req) });
});
export default router;