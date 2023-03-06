import { csrfSync } from 'csrf-sync';
const csrfProtect = csrfSync();

function isAuthenticated(req, res, next) {
  if(!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

export { isAuthenticated, csrfProtect };