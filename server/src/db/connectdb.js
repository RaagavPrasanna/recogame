//remove ../env/env.js ---------before merge
import '../env/env.js';
import db from './db.js';
import api from '../../controller/steamapi/steam_api.js';
import queries from './queries.js';

/**
 * get first list of games from steam and send to mongo
 * need to handle db.isconnect();
 */
async function steamGameToMongo(){
  try{
    let games = await api.fetchAllSteamApps();
    await db.connect('620-reco-test1');
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
  await db.connect('620-reco-test1');
  await queries.insertOneGame(game);
}
/**
 * find a game by id from Mongodb
 * @param {number} id of game
 * @returns object of game detail infomation from Mongodb
 */
async function findGameDetail(id){
  await db.connect('620-reco-test1');
  let game = await queries.findOneGame(id);
  return game;
}
await oneGameToMongo(440);
// export default {
//   steamGameToMongo,
//   oneGameToMongo,
//   findGameDetail
// };