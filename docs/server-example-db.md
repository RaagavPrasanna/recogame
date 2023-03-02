# Queries

```javascript
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
  return await models.GameDetails.findOne({ steamId: id });
}
```

# API Examples

```javascript
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
    await queries.insertAllGames(games);
  } catch (e){
    console.error('can not insert game info in game-all');
  }
}

/**
 * get one game from api by id and sent to mongo
 * need to handle db.isconnect();
 * @param {number} game id
 */
async function oneGameToMongo(id){
  let game = await api.fetchGameInfo(id);
  await queries.insertOneGame(game);
}
/**
 * find a game by id from Mongodb
 * @param {number} id of game
 * @returns object of game detail infomation from Mongodb
 */
async function findGameDetail(id){
  let game = await queries.findOneGame(id);
  return game;
}
```
