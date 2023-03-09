import express from 'express';
import game from './game.js';
import docs from './docs.js';

const router = express.Router();

router.use('/game', game);
router.use('/docs', docs);

export default router;

