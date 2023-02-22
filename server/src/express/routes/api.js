import express from 'express';

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const router = express.Router();


// Mock Data (Generated by Github Copilot)
let games = [
  { id:'1', name: 'Minecraft', description: 'Block game' },
  { id:'2', name: 'Terraria', description: 'Block game' },
  { id:'3', name: 'Factorio', description: 'Factory game' },
  { id:'4', name: 'Dota 2', description: 'MOBA' },
  { id:'5', name: 'League of Legends', description: 'MOBA' },
  { id:'6', name: 'Warcraft 3', description: 'RTS' },
  { id:'7', name: 'Starcraft 2', description: 'RTS' },
  { id:'8', name: 'Age of Empires 2', description: 'RTS' },
  { id:'9', name: 'Counter-Strike: Global Offensive', description: 'FPS' },
  { id:'10', name: 'Call of Duty: Modern Warfare', description: 'FPS' },
  { id:'11', name: 'Overwatch', description: 'FPS' },
  { id:'12', name: 'Hearthstone', description: 'Card game' },
  { id:'13', name: 'Gwent', description: 'Card game' },
  { id:'14', name: 'Halo 3', description: 'FPS' },
  { id:'15', name: 'Halo 2', description: 'FPS' },
  { id:'16', name: 'Halo 1', description: 'FPS' },
  { id:'17', name: 'Halo 4', description: 'FPS' },
  { id:'18', name: 'Halo 5', description: 'FPS' },
  { id:'19', name: 'Halo 6', description: 'FPS' },
  { id:'20', name: 'Halo 7', description: 'FPS' },
  { id:'21', name: 'Halo 8', description: 'FPS' },
  { id:'22', name: 'Halo 9', description: 'FPS' }
];

async function getAllGamesFromDB() {
  // Currently just returns the games array
  return games;
}

async function getGameFromDB(id) {
  // Currently just returns the game with the given id
  return games.find(game => game.id === id);
}

router.use(express.json());

router.get('/all_games', async (_, res) => {
  try {
    const games = await getAllGamesFromDB();
    res.json(games);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/game/:id', async (req, res) => {
  try {
    const game = await getGameFromDB(req.params.id);
    if(game === undefined) {
      res.status(404).send('Game not found');
    }
    res.json(game);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', (_, res) => {
  res.send('Hello world');
});

export default router;

