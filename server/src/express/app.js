import path from 'path';

import express from 'express';

import projectRoot from '../env/project-root.js';
import api from './routes/api/api.js';
import authentication from './routes/authentication.js';

const app = express();

function html(req, res, next) {
  if(req.accepts('html')) {
    return next();
  }
  return next('route');
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(
  projectRoot,
  'client', 'build'
)));

// Routers
app.use('/api', api);
app.use('/authentication', authentication);

app.get('*', html, (_, res) => {
  res.sendFile('index.html', { root: path.join(
    projectRoot,
    'client', 'build'
  ) });
});

// Other page
app.use((_, res) => {
  res.status(404).send('Requested page not found');
});


export default app;

