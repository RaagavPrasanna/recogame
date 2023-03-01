
//remove ../env/env.js ---------before merge
import '../env/env.js';
import db from './db.js';
import api from '../controller/steamapi/steam_api.js';
import queries from './queries.js';

/**
 * get first list of games from steam and send to mongo
 * need to handle db.isconnect();
 */
async function steamGameToMongo(){
  try{
    let games = await api.fetchAllSteamApps();
    await db.connect('620-reco-test2');
    await queries.insertAllGames(games);
  } catch (e){
    console.log('can not insert game info in all-games');
  } 
}

/**
 * get one game from api by id and sent to mongo
 * need to handle db.isconnect();
 * @param {number} game id
 */
async function oneGameToMongo(id){
  let game = await api.fetchGameInfo(id);
  console.log(game);
  await db.connect('620-reco-test2');
  await queries.insertOneGame(game);
}
/**
 * find a game by id from Mongodb
 * @param {number} id of game
 * @returns object of game detail infomation from Mongodb
 */
async function findGameDetail(id){
  await db.connect('620-reco-test2');
  let game = await queries.findOneGame(id);
  console.log(game);
  return game;
}

// await findGameDetail(10);
// await oneGameToMongo(10);
await steamGameToMongo();

// export default {
//   steamGameToMongo,
//   oneGameToMongo,
//   findGameDetail
// };