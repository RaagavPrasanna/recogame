import express from 'express';
import models from '../../../db/models.js';
import utils from '../../utils.js';

const router = express.Router();

/**
 * @typedef {Object} Query
 * @property {string[]?} developers
 * @property {string[]?} publishers
 * @property {string[]?} categories
 * @property {string[]?} genres
 * @property {string[]?} platforms
 */
function constructQuery(params) {
  return {
    developers: params.developers?.split(','),
    publishers: params.publishers?.split(','),
    categories: params.categories?.split(','),
    genres: params.genres?.split(','),
    platforms: params.platforms?.split(','),
  };
}

/**
 * @param query {Query}?
 * @param page {number?}
 * @param limit {number?}
 */
async function filterGames(query = {}, page = null, limit = null) {
  /**
   * @param values {string[]}
   */
  function generateFilter(values) {
    return { $all: values.map(v => new RegExp(v, 'i')) };
  }

  const filters = {};
  if (query?.developers) {
    filters.developers = generateFilter(query.developers);
  }
  if (query?.publishers) {
    filters.publishers = generateFilter(query.publishers);
  }
  if (query?.categories) {
    filters.categories = generateFilter(query.categories);
  }
  if (query?.genres) {
    filters.genres = generateFilter(query.genres);
  }
  if (query?.platforms) {
    filters.platforms = generateFilter(query.platforms);
  }

  const games = await models.GameDetails.find(filters, { _id: 1 })
    .skip(page && limit ? page * limit : null)
    .limit(limit || null);
  return games?.map(o => o._id);
}

async function getGameFeed(query, page = 0, limit = 4) {
  const ids = await filterGames(query, page, limit);
  return await (
    (await models.ViewGameDetailsShort.getModel())
      .find(
        { id: { $in: ids } },
        models.CLEAN_PROJECTION
      )
  );
}

async function getGameDetails(id) {
  return await models.GameDetails.findOne({ _id: id }, models.CLEAN_PROJECTION);
}

async function getAllGames() {
  return await (
    (await models.ViewGameName.getModel())
      .find({}, models.CLEAN_PROJECTION)
  );
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
 *       - in: query
 *         name: developers
 *         schema:
 *           type: string
 *         description: Comma-separated list of developers to filter by.
 *         example: "Valve,Hidden Path Entertainment"
 *       - in: query
 *         name: publishers
 *         schema:
 *           type: string
 *         description: Comma-separated list of publishers to filter by.
 *         example: "Bethesda Softworks"
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of categories to filter by.
 *         example: "Multi-player"
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by.
 *         example: "Action"
 *       - in: query
 *         name: platforms
 *         schema:
 *           type: string
 *         description: Comma-separated list of platforms to filter by.
 *         example: "linux"
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
 *                  id:
 *                    type: string
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
    const games = await getGameFeed(
      constructQuery(req.query),
      page
    );
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
 *                example: ["windows"]
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
    const game = await getGameDetails(id);
    if (!game) {
      res.status(404).send('Game not found');
      return;
    }
    res.json(game);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send(`Invalid game id: ${id}`);
    } else {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
});

/**
 * @swagger
 * /game/list:
 *   get:
 *     summary: List of all names ang game ids.
 *     description: Retrieve bare minimum details about all the games.
 *     tags:
 *       - games
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
 *                  id:
 *                    type: string
 *                    description: Unique ID of the game.
 *                    example: 63f3ca8d2b23f928d766a57f
 *                  name:
 *                    type: string
 *                    description: Name of the game.
 *                    example: "DOOM (1993)"
 *      500:
 *        description: Issues with our server
 */
router.get('/list', async (_, res) => {
  try {
    res.json(await getAllGames());
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /game/developers:
 *   get:
 *     summary: Get a list of available game developers.
 *     description: Returns a list of strings representing the developers of available games.
 *       Can be filtered by developers, publishers, categories, genres, or platforms.
 *     tags:
 *       - other
 *     parameters:
 *       - in: query
 *         name: developers
 *         schema:
 *           type: string
 *         description: Comma-separated list of developers to filter by.
 *         example: "Valve,Hidden Path Entertainment"
 *       - in: query
 *         name: publishers
 *         schema:
 *           type: string
 *         description: Comma-separated list of publishers to filter by.
 *         example: "Bethesda Softworks"
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of categories to filter by.
 *         example: "Multi-player"
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by.
 *         example: "Action"
 *       - in: query
 *         name: platforms
 *         schema:
 *           type: string
 *         description: Comma-separated list of platforms to filter by.
 *         example: "linux"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             example: ["Valve", "Hidden Path Entertainment"]
 *       500:
 *        description: Issues with our server
 */
router.get('/developers', async (req, res) => {
  try {
    const query = constructQuery(req.query);
    const ids = await filterGames(query);
    const developers = await models.GameDetails
      .find({ _id: { $in: ids } })
      .distinct('developers', { developers: { $nin: ['', null] } });
    res.json(
      query.developers ?
        developers.filter(e => !query.developers.includes(e))
        : developers
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /game/publishers:
 *   get:
 *     summary: Get a list of available game publishers.
 *     description: Returns a list of strings representing the publishers of available games.
 *       Can be filtered by developers, publishers, categories, genres, or platforms.
 *     tags:
 *       - other
 *     parameters:
 *       - in: query
 *         name: developers
 *         schema:
 *           type: string
 *         description: Comma-separated list of developers to filter by.
 *         example: "Valve,Hidden Path Entertainment"
 *       - in: query
 *         name: publishers
 *         schema:
 *           type: string
 *         description: Comma-separated list of publishers to filter by.
 *         example: "Bethesda Softworks"
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of categories to filter by.
 *         example: "Multi-player"
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by.
 *         example: "Action"
 *       - in: query
 *         name: platforms
 *         schema:
 *           type: string
 *         description: Comma-separated list of platforms to filter by.
 *         example: "linux"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             example: ["Bethesda Softworks"]
 *       500:
 *        description: Issues with our server
 */
router.get('/publishers', async (req, res) => {
  try {
    const query = constructQuery(req.query);
    const ids = await filterGames(query);
    const publishers = await models.GameDetails
      .find({ _id: { $in: ids } })
      .distinct('publishers', { publishers: { $nin: ['', null] } });
    res.json(
      query.publishers ?
        publishers.filter(e => !query.publishers.includes(e))
        : publishers
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /game/categories:
 *   get:
 *     summary: Get a list of available game categories.
 *     description: Returns a list of strings representing the categories of available games.
 *       Can be filtered by developers, publishers, categories, genres, or platforms.
 *     tags:
 *       - other
 *     parameters:
 *       - in: query
 *         name: developers
 *         schema:
 *           type: string
 *         description: Comma-separated list of developers to filter by.
 *         example: "Valve,Hidden Path Entertainment"
 *       - in: query
 *         name: publishers
 *         schema:
 *           type: string
 *         description: Comma-separated list of publishers to filter by.
 *         example: "Bethesda Softworks"
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of categories to filter by.
 *         example: "Multi-player"
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by.
 *         example: "Action"
 *       - in: query
 *         name: platforms
 *         schema:
 *           type: string
 *         description: Comma-separated list of platforms to filter by.
 *         example: "linux"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             example: ["Multi-player", "Single-player"]
 *       500:
 *        description: Issues with our server
 */
router.get('/categories', async (req, res) => {
  try {
    const query = constructQuery(req.query);
    const ids = await filterGames(query);
    const categories = await models.GameDetails
      .find({ _id: { $in: ids } })
      .distinct('categories', { categories: { $nin: ['', null] } });
    res.json(
      query.categories ?
        categories.filter(e => !query.categories.includes(e))
        : categories
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /game/genres:
 *   get:
 *     summary: Get a list of available game genres.
 *     description: Returns a list of strings representing the genres of available games.
 *       Can be filtered by developers, publishers, categories, genres, or platforms.
 *     tags:
 *       - other
 *     parameters:
 *       - in: query
 *         name: developers
 *         schema:
 *           type: string
 *         description: Comma-separated list of developers to filter by.
 *         example: "Valve,Hidden Path Entertainment"
 *       - in: query
 *         name: publishers
 *         schema:
 *           type: string
 *         description: Comma-separated list of publishers to filter by.
 *         example: "Bethesda Softworks"
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of categories to filter by.
 *         example: "Multi-player"
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by.
 *         example: "Action"
 *       - in: query
 *         name: platforms
 *         schema:
 *           type: string
 *         description: Comma-separated list of platforms to filter by.
 *         example: "linux"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             example: ["Action"]
 *       500:
 *        description: Issues with our server
 */
router.get('/genres', async (req, res) => {
  try {
    const query = constructQuery(req.query);
    const ids = await filterGames(query);
    const genres = await models.GameDetails
      .find({ _id: { $in: ids } })
      .distinct('genres', { genres: { $nin: ['', null] } });
    res.json(
      query.genres ?
        genres.filter(e => !query.genres.includes(e))
        : genres
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /game/platforms:
 *   get:
 *     summary: Get a list of available game platforms.
 *     description: Returns a list of strings representing the platforms of available games.
 *       Can be filtered by developers, publishers, categories, genres, or platforms.
 *     tags:
 *       - other
 *     parameters:
 *       - in: query
 *         name: developers
 *         schema:
 *           type: string
 *         description: Comma-separated list of developers to filter by.
 *         example: "Valve,Hidden Path Entertainment"
 *       - in: query
 *         name: publishers
 *         schema:
 *           type: string
 *         description: Comma-separated list of publishers to filter by.
 *         example: "Bethesda Softworks"
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of categories to filter by.
 *         example: "Multi-player"
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by.
 *         example: "Action"
 *       - in: query
 *         name: platforms
 *         schema:
 *           type: string
 *         description: Comma-separated list of platforms to filter by.
 *         example: "linux"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             example: ["linux", "windows"]
 *       500:
 *        description: Issues with our server
 */
router.get('/platforms', async (req, res) => {
  try {
    const query = constructQuery(req.query);
    const ids = await filterGames(query);
    const platforms = await models.GameDetails
      .find({ _id: { $in: ids } })
      .distinct('platforms', { platforms: { $nin: ['', null] } });
    res.json(
      query.platforms ?
        platforms.filter(e => !query.platforms.includes(e))
        : platforms
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
