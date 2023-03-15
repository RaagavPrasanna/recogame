import express from 'express';
import game from './game.js';

const router = express.Router();

router.use('/game', game);

export default router;
