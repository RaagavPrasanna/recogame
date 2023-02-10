import path from 'path';

import express from 'express';

import projectRoot from '../env/project-root.js';
import api from './routes/api.js';
import other from './routes/other.js';


const app = express();

// API
app.use('/api', api);

// React
app.use(express.static(path.join(
  projectRoot,
  'client', 'build'
)));

// Other
app.use(other);


export default app;

