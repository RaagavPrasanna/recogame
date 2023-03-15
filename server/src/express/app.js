import path from 'path';

import express from 'express';

import projectRoot from '../env/project-root.js';
import api from './routes/api/api.js';
import authentication from './routes/authentication.js';
import post from './routes/post/post.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(
  projectRoot,
  'client', 'build'
)));

// Routers
app.use('/api', api);
app.use('/authentication', authentication);
app.use('/post', post);

// Other page
app.use((_, res) => {
  res.status(404).send('Requested page not found');
});

export default app;

