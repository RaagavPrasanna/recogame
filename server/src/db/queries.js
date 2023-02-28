import models from './models.js';

/**
 * Query : insert list of games
 * @param {array}  info :array of {appid: Number, name: String}
 */
async function insertAllGames(info){
  await info.map(async (game)=>
    await models.AllGames.create(game)
  );
}

/**
 * Query : insert one game detail
 * @param {object} info
 */
async function insertOneGame(info){
  await models.GameDetails.create(info);
}

/***
 * Query: find game by appid
 * @param {number} appid
 */
async function findOneGame(id){
  return await models.GameDetails.findOne({ sourceId: id });
}

export default {
  insertAllGames,
  insertOneGame,
  findOneGame
};