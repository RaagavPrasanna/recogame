import express from 'express';
import models from '../../db/models.js';

const router = express.Router();

const CLEAN_PROJECTION = { _id: false, __v: false };


async function getAllGamesFromDB() {
  return await models.AllGames.find({}, CLEAN_PROJECTION);
}

/** Currently just returns the game with the given id */
async function getGameFromDB(id) {
  return await models.GameDetails.findOne({ steamId: id }, CLEAN_PROJECTION);
}

router.use(express.json());

/**
 * @swagger
 * /all-games:
 *   get:
 *     summary: Retrieve all games
 *     description: Retrieve all games that are found in the database which can then be used to query specfiic game data
 *     responses:
 *      200:
 *        description: A list of all games
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                properties:
 *                  appid:
 *                    type: integer
 *                    description: The unique id of the game
 *                    example: 1353100
 *                  name:
 *                    type: string
 *                    description: The name of the game
 *                    example: "The Witcher 3: Wild Hunt"
 *      500:
 *        description: Server error. Can be caused by a database error
*/
router.get('/all-games', async (_, res) => {
  try {
    const games = await getAllGamesFromDB();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /game/{id}:
 *   get:
 *     summary: Retrieve a single game
 *     description: Retrieve a single game from the database and use the data to display information about the game
*/
router.get('/game/:id', async (req, res) => {
  try {
    if(isNaN(req.params.id)) {
      res.status(400).send('Invalid ID');
      return;
    }
    const game = await getGameFromDB(req.params.id);
    if(!game) {
      res.status(404).send('Game not found');
      return;
    }
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;

