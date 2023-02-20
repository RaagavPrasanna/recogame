import path from 'path';

import express from 'express';

import projectRoot from '../env/project-root.js';
import api from './routes/api.js';
import other from './routes/other.js';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Rest API',
      description: 'A simple rest API',
      servers: ['http://localhost:3001']
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
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

