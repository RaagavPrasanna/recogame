import path from 'path';

import express from 'express';

import projectRoot from '../env/project-root.js';
import api from './routes/api.js';
import other from './routes/other.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};


const options = {
  apis: ['./routes/api.js'],
  swaggerDefinition,
};

const swaggerSpec = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

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

