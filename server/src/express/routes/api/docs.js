import path from 'path';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import projectRoot from '../../../env/project-root.js';

const router = express.Router();

const options = {
  apis: [
    path.join(
      projectRoot,
      'server', 'src',
      'express', 'routes',
      'api', '*.js'
    )
  ],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recogame REST API',
      description:
        'REST API to Recogame DB'
    },
    servers: [
      {
        url: '/api',
        description: 'API endpoint for server',
      },
    ],
  }
};

const spec = swaggerJsdoc(options);

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(spec)
);

export default router;

