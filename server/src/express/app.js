import express from 'express';

import api from './routes/api.js';


const app = express();

app.use('/', api);


export default app;

