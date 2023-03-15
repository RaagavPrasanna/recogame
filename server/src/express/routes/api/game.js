import express from 'express';
import models from '../../../db/models.js';
import utils from '../../utils.js';

const router = express.Router();

/**
 * @param page {number}
 * @param limit {number}
 */
async function getAllGamesFromDB(page, limit = 4) {
  return await (
    (await models.ViewGameDetailsShort.getModel())
      .find({}, models.CLEAN_PROJECTION)
      .skip(page * limit)
      .limit(limit)
  );
}

async function getGameFromDB(id) {
  return await models.GameDetails.findOne({ _id: id }, models.CLEAN_PROJECTION);
}

/**
 * @swagger
 * /game/feed:
 *   get:
 *     summary: Sorted and paginated game feed.
 *     description: Retrieve shortened details about the games in a sorted and paginated form.
 *     tags:
 *       - games
 *     parameters:
 *       - in: query
 *         name: page
 *         default: 0
 *         schema:
 *           type: integer
 *           description: Current page, skips items before returning the result.
 *     responses:
 *      200:
 *        description: A list of all games.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  appid:
 *                    type: integer
 *                    description: Unique ID of the game.
 *                    example: 63f3ca8d2b23f928d766a57f
 *                  name:
 *                    type: string
 *                    description: Name of the game.
 *                    example: "DOOM (1993)"
 *                  developers:
 *                    type: array
 *                    items:
 *                      type: string
 *                    description: List of developers of the game.
 *                    example: [ "idSoftware" ]
 *                  imageHeader:
 *                    type: string
 *                    description: URL to the header image of the game.
 *                    example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/header.jpg?t=1663861909"
 *                  shortDescription:
 *                    type: string
 *                    description: Short description of the game.
 *                    example: "You’re a marine—one of Earth’s best—recently assigned..."
 *      500:
 *        description: Issues with our server
 */
router.get('/feed', async (req, res) => {
  const page = req.query.page || 0;
  try {
    utils.validation.validateNumber(page, { int: true, min: 0 });
  } catch (e) {
    res.status(400).send(`Invalid page: ${e.message}`);
    return;
  }

  try {
    const games = await getAllGamesFromDB(page);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


/**
 * @swagger
 * /game/info/{id}:
 *   get:
 *     summary: Retrieve a single game.
 *     description: Retrieve a single game from the database and use the data to display information about the game.
 *     tags:
 *       - games
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the game to retrieve.
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *       description: A single game.
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              steamId:
 *                type: integer
 *                description: Unique id of the game.
 *                example: 2280
 *              name:
 *                type: string
 *                description: Name of the game.
 *                example: "DOOM (1993)"
 *              developers:
 *                type: array
 *                description: List of developers of the game.
 *                example: ["id Software"]
 *              publishers:
 *                type: array
 *                description: List of publishers of the game.
 *                example: ["id Software"]
 *              imageHeader:
 *                type: string
 *                description: URL of the header image.
 *                example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/header.jpg?t=1663861909"
 *              imageBackground:
 *                type: string
 *                description: URL of the background image
 *                example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/page.bg.jpg?t=1663861909"
 *              categories:
 *                type: array
 *                description: List of categories that the game falls under.
 *                example: ["Single-player", "Multi-player", "PvP", "Shared/Split Screen PvP", "Co-op"]
 *              genres:
 *                type: array
 *                description: List of genres that the game falls under.
 *                example: ["Action"]
 *              storeUrl:
 *                type: string
 *                description: URL of the game on the steam store.
 *                example: "https://store.steampowered.com/app/2280"
 *              detailedDescription:
 *                type: string
 *                description: Detailed description of the game
 *                example: "Developed by id Software and originally released in 1993."
 *              shortDescription:
 *                type: string
 *                description: Short description of the game
 *                example: "You’re a marine—one of Earth’s best—recently assigned to the Union Aerospace."
 *              supportedLanguages:
 *                type: array
 *                description: Languages that the game supports.
 *                example: ["English", "French", "Italian", "German", "Spanish - Spain"]
 *              platforms:
 *                type: array
 *                description: Platforms that the game supports.
 *                example: ["Windows"]
 *              metacritic:
 *                type: integer
 *                description: The MetaCritic score of the game
 *                example: null
 *              screenshots:
 *                type: array
 *                description: List of screenshots of the game.
 *                example: ["https://cdn.akamai.steamstatic.com/steam/apps/2280/ss_0316d2cb78eed32d21a90.jpg"]
 *              movies:
 *                type: array
 *                description: Movies of the game.
 *                example: null
 *              recommendations:
 *                type: integer
 *                description: Number of recommendations for the game.
 *                example: 12381
 *              background:
 *                type: string
 *                description: Background of the game.
 *                example: "https://cdn.akamai.steamstatic.com/steam/apps/2280/page_bg_generated_v6b.jpg?t=1663861909"
 *              contentDescriptors:
 *                type: array
 *                description: List of content descriptors of the game.
 *                example: null
 *      400:
 *        description: Invalid ID (is not numeric)
 *      404:
 *        description: Specified game id not found
 *      500:
 *        description: Issues with our server
 */
router.get('/info/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const game = await getGameFromDB(id);
    if (!game) {
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

