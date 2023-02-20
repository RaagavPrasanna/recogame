import mockingoose from 'mockingoose';
import request from 'supertest';

import app from '../express/app.js';
import models from '../db/models.js';


describe('API GET', () => {
  test('Get all games', async () => {
    const MOCK_GAMES = [{ appid: 1, name: 'Uncharted' }, { appid: 2, name: 'Mario' }];
    mockingoose(models.AllGames).toReturn(MOCK_GAMES, 'find');

    const res = await request(app).get('/api/all_games');

    // To remove extra _id key value pair that is added by mockingoose
    res.body.forEach(e => delete e._id);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(MOCK_GAMES);
  });

  test('Get game by id', async () => {
    const MOCK_GAME = { steamId: 1, name: 'Uncharted' };
    mockingoose(models.GameDetails).toReturn(MOCK_GAME, 'findOne');

    const res = await request(app).get('/api/game/1');

    // To remove extra _id key value pair that is added by mockingoose
    delete res.body._id;
    expect(res.statusCode).toEqual(200);
    expect(res.body.steamId).toEqual(MOCK_GAME.steamId);
    expect(res.body.name).toEqual(MOCK_GAME.name);
  });

  test('Get game by invalid game i', async () => {
    mockingoose(models.GameDetails).toReturn(null, 'findOne');
    const res = await request(app).get('/api/game/hello');
    expect(res.statusCode).toEqual(400);
  });

  test('Get game by non existent game id', async () => {
    mockingoose(models.GameDetails).toReturn(null, 'findOne');
    const res = await request(app).get('/api/game/1');
    expect(res.statusCode).toEqual(404);
  });
});