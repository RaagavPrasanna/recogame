import express from 'express';
import models from '../../../db/models.js';
import utils from '../../utils.js';
import utilsRoutes from '../../utils.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  '/rating',
  utils.authentication.isAuthenticated,
  utils.authentication.csrfProtect.csrfSynchronisedProtection,
  async (req, res) => {
    const userId = (await models.UserProfile.findOne())._id;
    const gameId = (await models.GameDetails.findOne())._id;

    // ID
    const id = req.body.game;
    try {
      if (!id) {
        res.status(400).send('Specify game id');
        return;
      } else if (!await models.GameDetails.findOne({ _id: id })) {
        res.status(404).send(`Game not found: ${id}`);
        return;
      }
    } catch (err) {
      if (err.name === 'CastError') {
        res.status(400).send(`Invalid game id: ${id}`);
        return;
      } else {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
    }

    // Rating
    const rating = req.body.rating;
    try {
      utilsRoutes.validation.validateNumber(rating, { int: true, min: -1, max: 2 });
    } catch (e) {
      res.status(400).send(`Invalid rating: ${e.message}`);
      return;
    }

    if (rating === 0) {
      // Delete rating
      await models.GameRating.deleteOne({
        user: userId,
        game: gameId,
      });
      res.status(200).send('Deleted');
    } else {
      // Insert or update
      await models.GameRating.updateOne(
        {
          user: userId,
          game: gameId,
        },
        {
          user: userId,
          game: gameId,
          thumbsUp: rating > 0
        },
        { upsert: true }
      );
      res.status(200).send('Inserted');
    }
  });

export default router;
