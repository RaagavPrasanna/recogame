
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
  let games = await api.fetchAllSteamApps();
  await db.connect('620-recogame');
  await queries.insertAllGames(games); 
}

/**
 * get one game from api by id and sent to mongo
 * need to handle db.isconnect();
 * @param {number} game id
 */
async function oneGameToMongo(id){
  let game = await api.fetchGameInfo(id);
  await db.connect('620-recogame');
  await queries.insertOneGame(game); 
}

await oneGameToMongo(440);

export default {
  steamGameToMongo,
  oneGameToMongo
};