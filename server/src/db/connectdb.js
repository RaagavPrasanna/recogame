
//remove ../env/env.js ---------before merge
import '../env/env.js';
import db from './db.js';
import models from './models.js';
import api from '../../controller/steamapi/steam_api.js';

async function getGame1(){
  let games = await api.fetchAllSteamApps();
  console.log(games);
  return games;
}
async function getGame2(){
  let games = await api.fetchGameInfo(230102);
  console.log(games);
  return games;
}
getGame2();
// // Connect
// await db.connect('620-recogame');

// // Insert an entry
// await models.PostText.create({
//   username: 'shirley',
//   text: 'hi',
// });

// // Find an entry
// const m = await models.PostText.findOne({ username: 'shirley' });
// console.log(m);

// // End the connection
// await db.disconnect();