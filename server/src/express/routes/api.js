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
 *                type: object
 *                properties:
 *                  appid:
 *                    type: integer
 *                    description: The unique id of the game
 *                    example: 1353100
 *                  name:
 *                    type: string
 *                    description: The name of the game
 *                    example: "SCP: The Foundation"
 *      500:
 *        description: Issues with our server
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
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The id of the game to retrieve
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *       description: A single game
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              steamId:
 *                type: integer
 *                description: The unique id of the game
 *                example: 2280
 *              name:
 *                type: string
 *                description: The name of the game
 *                example: "DOOM (1993)"
 *              developers:
 *                type: array
 *                description: The developers of the game
 *                example: ["id Software"]
 *              publishers:
 *                type: array
 *                description: The publishers of the game
 *                example: ["id Software"]
 *              imageHeader:
 *                type: string
 *                description: The url of the header image
 *                example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/header.jpg?t=1663861909"
 *              imageBackground:
 *                type: string
 *                description: The url of the background image
 *                example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/page.bg.jpg?t=1663861909"
 *              categories:
 *                type: array
 *                description: The categories that the game falls under
 *                example: ["Single-player", "Multi-player", "PvP", "Shared/Split Screen PvP", "Co-op"]
 *              genres:
 *                type: array
 *                description: The genres that the game falls under
 *                example: ["Action"]
 *              storeUrl:
 *                type: string
 *                description: The url of the game on the steam store
 *                example: "https://store.steampowered.com/app/2280"
 *              detailedDescription:
 *                type: string
 *                description: The detailed description of the game
 *                example: "Developed by id Software and originally released in 1993."
 *              shortDescription:
 *                type: string
 *                description: The short description of the game
 *                example: "You’re a marine—one of Earth’s best—recently assigned to the Union Aerospace."
 *              supportedLanguages:
 *                type: array
 *                description: The languages that the game supports
 *                example: ["English", "French", "Italian", "German", "Spanish - Spain"]
 *              platforms:
 *                type: array
 *                description: The platforms that the game supports
 *                example: ["Windows"]
 *              metacritic:
 *                type: integer
 *                description: The metacritic score of the game
 *                example: null
 *              screenshots:
 *                type: array
 *                description: The screenshots of the game
 *                example: ["https://cdn.akamai.steamstatic.com/steam/apps/2280/ss_0316d2cb78eed32d21a90.jpg"]
 *              movies:
 *                type: array
 *                description: The movies of the game
 *                example: null
 *              recommendations:
 *                type: integer
 *                description: The number of recommendations for the game
 *                example: 12381
 *              background:
 *                type: string
 *                description: The background of the game
 *                example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/page_bg_generated_v6b.jpg?t=1663861909"
 *              contentDescriptors:
 *                type: array
 *                description: The content descriptors of the game
 *                example: null
 *      400:
 *        description: Invalid ID (is not numeric)
 *      404:
 *        description: Specified game id not found
 *      500:
 *        description: Issues with our server
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

