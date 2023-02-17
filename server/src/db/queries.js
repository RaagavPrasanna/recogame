import '../env/env.js';
import models from './models.js';


async function insertAllGames(info){
  await info.map(async (game)=> 
    await models.AllGames.create(game)
  );
}

async function insertOneGame(info){
  await models.GameDetail.create(info);
}

export default { 
  insertAllGames,
  insertOneGame
};