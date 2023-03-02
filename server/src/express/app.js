import path from 'path';

import express from 'express';

import projectRoot from '../env/project-root.js';
import api from './routes/api.js';
import other from './routes/other.js';
import authentication from './routes/authentication.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express REST API',
    description:
      'This is a REST API application made with Express. It retrieves data from our database.'
  },
  servers: [
    {
      url: '/api',
      description: 'api endpoint for server',
    },
  ],
};


const options = {
  apis: ['./src/express/routes/api.js'],
  swaggerDefinition,
};

const swaggerSpec = swaggerJsdoc(options);

// JSON middleware
app.use(express.json());

// Swagger docs
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// API
app.use('/api', api);

app.use('/authentication', authentication);

// React
app.use(express.static(path.join(
  projectRoot,
  'client', 'build'
)));

// Other
app.use(other);


export default app;

