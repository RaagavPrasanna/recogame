import { jest } from '@jest/globals';
import mockingoose from 'mockingoose';
import request from 'supertest';

import app from '../express/app.js';
import models from '../db/models.js';
import mongoose from 'mongoose';

const GAMES = [
  {
    sourceId: 10,
    sourceName: 'steam',
    name: 'Counter-Strike',
    developers: ['Valve'],
    publishers: ['Valve'],
    imageHeader: 'https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1666823513',
    imageBackground: 'https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated.jpg?t=1666823513',
    categories: ['First-Person'],
    genres: ['Action'],
    storeUrl: 'https://store.steampowered.com/app/10',
    detailedDescription: "Play the world's number 1 online action game",
    shortDescription: 'Play',
    supportedLanguages: ['English'],
    platforms: [
      'windows',
      'mac',
      'linux'
    ],
    screenshots: [
      'https://cdn.akamai.steamstatic.com/steam/apps/10/0000000132.600x338.jpg?t=1666823513',
      'https://cdn.akamai.steamstatic.com/steam/apps/10/0000002543.600x338.jpg?t=1666823513'
    ],
    movies: []
  },
  {
    sourceId: 2280,
    sourceName: 'steam',
    name: 'DOOM (1993)',
    developers: ['id Software'],
    publishers: ['Bethesda'],
    imageHeader: 'https://cdn.akamai.steamstatic.com/steam/apps/2280/header.jpg?t=1663861909',
    imageBackground: 'https://cdn.akamai.steamstatic.com/steam/apps/2280/page.bg.jpg?t=1663861909',
    categories: ['Original'],
    genres: ['Action'],
    storeUrl: 'https://store.steampowered.com/app/2280',
    detailedDescription: 'Developed by id Software, and released in 1993, DOOM pioneered first-person shooter.',
    shortDescription: 'You’re a marine—one of Earth.',
    supportedLanguages: [
      'English',
      'French',
    ],
    platforms: [
      'windows'
    ],
    screenshots: [
      'https://cdn.akamai.steamstatic.com/steam/apps/2280/'
      + 'ss_0316d2cb78eed32d21a90f197da0e0ea4b06e776.600x338.jpg?t=1663861909',
    ],
    movies: []
  }
];

describe('API GET', () => {
  test('Get feed without parameters', async () => {
    jest.spyOn(models.ViewGameDetailsShort, 'getModel')
      .mockImplementation(async () => {
        return mongoose.model(
          'view-feed',
          models.ViewGameDetailsShort.schema
        );
      });
    mockingoose(await models.ViewGameDetailsShort.getModel()).toReturn(GAMES, 'find');

    const res = await request(app).get('/api/game/feed');

    // To remove extra _id key value pair that is added by mockingoose
    res.body.forEach(e => delete e._id);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      GAMES.map((g) => {
        return {
          name: g.name,
          developers: g.developers,
          imageHeader: g.imageHeader,
          shortDescription: g.shortDescription,
        };
      })
    );
  });

  test.each([
    ['developers', 'Valve', [0]],
    ['developers', 'id Software', [1]],
    ['developers', 'Ubisoft', []],
    ['developers', 'Valve', [0]],
    ['developers', 'Bethesda', [1]],
    ['developers', 'Ubisoft', []],
    ['categories', 'First-Person', [0]],
    ['categories', 'Original', [1]],
    ['categories', 'Sports', []],
    ['genres', 'Action', [0, 1]],
    ['genres', 'Adventure', []],
    ['platforms', 'windows', [0, 1]],
    ['platforms', 'mac', [0]],
    ['platforms', 'ps4', []],
  ])('Get feed with parameters', async (key, value, expectedIndexes) => {
    jest.spyOn(models.ViewGameDetailsShort, 'getModel')
      .mockImplementation(async () => {
        return mongoose.model(
          'view-feed',
          models.ViewGameDetailsShort.schema
        );
      });
    mockingoose(await models.ViewGameDetailsShort.getModel()).toReturn(
      expectedIndexes.map(i => GAMES[i]),
      'find'
    );

    const res = await request(app).get(`/api/game/feed?${key}=${value}`);

    // To remove extra _id key value pair that is added by mockingoose
    res.body.forEach(e => delete e._id);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expectedIndexes.map(i => GAMES[i]).map((g) => {
        return {
          name: g.name,
          developers: g.developers,
          imageHeader: g.imageHeader,
          shortDescription: g.shortDescription,
        };
      })
    );
  });

  test('Get list', async () => {
    jest.spyOn(models.ViewGameName, 'getModel')
      .mockImplementation(async () => {
        return mongoose.model(
          'view-list',
          models.ViewGameName.schema
        );
      });
    mockingoose(await models.ViewGameName.getModel()).toReturn(GAMES, 'find');

    const res = await request(app).get('/api/game/list');

    // To remove extra _id key value pair that is added by mockingoose
    res.body.forEach(e => delete e._id);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      GAMES.map((g) => {
        return {
          name: g.name
        };
      })
    );
  });


  test('Get game by id', async () => {
    const MOCK_GAME = GAMES[0];
    mockingoose(models.GameDetails).toReturn({ _id: 'a123', ...MOCK_GAME }, 'findOne');

    const res = await request(app).get('/api/game/info/a125');

    // To remove extra _id key value pair that is added by mockingoose
    delete res.body._id;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(MOCK_GAME);
  });

  test('Get game by non existent game id', async () => {
    mockingoose(models.GameDetails).toReturn(null, 'findOne');
    const res = await request(app).get('/api/game/info/1');
    expect(res.statusCode).toEqual(404);
  });


  test('Get developers', async () => {
    mockingoose(models.GameDetails).toReturn(['Valve', 'id Software'], 'distinct');

    const res = await request(app).get('/api/game/developers');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Valve', 'id Software']);
  });

  test('Get developers excludes queried developer', async () => {
    mockingoose(models.GameDetails).toReturn(['Valve', 'id Software'], 'distinct');

    const res = await request(app).get('/api/game/developers?developers=Valve');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['id Software']);
  });


  test('Get publishers', async () => {
    mockingoose(models.GameDetails).toReturn(['Valve', 'Bethesda'], 'distinct');

    const res = await request(app).get('/api/game/publishers');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Valve', 'Bethesda']);
  });

  test('Get publishers excludes queried publisher', async () => {
    mockingoose(models.GameDetails).toReturn(['Valve', 'Bethesda'], 'distinct');

    const res = await request(app).get('/api/game/publishers?publishers=Bethesda');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Valve']);
  });


  test('Get categories', async () => {
    mockingoose(models.GameDetails).toReturn(['First-Person', 'Original'], 'distinct');

    const res = await request(app).get('/api/game/categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['First-Person', 'Original']);
  });

  test('Get categories excludes queried category', async () => {
    mockingoose(models.GameDetails).toReturn(['First-Person', 'Original'], 'distinct');

    const res = await request(app).get('/api/game/categories?categories=First-Person');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Original']);
  });


  test('Get genres', async () => {
    mockingoose(models.GameDetails).toReturn(['Action', 'Original'], 'distinct');

    const res = await request(app).get('/api/game/genres');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Action', 'Original']);
  });

  test('Get genres excludes queried genre', async () => {
    mockingoose(models.GameDetails).toReturn(['Action', 'Original'], 'distinct');

    const res = await request(app).get('/api/game/genres?genres=Original');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Action']);
  });


  test('Get platforms', async () => {
    mockingoose(models.GameDetails).toReturn(['windows', 'mac', 'linux'], 'distinct');

    const res = await request(app).get('/api/game/categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['windows', 'mac', 'linux']);
  });

  test('Get platforms excludes queried platform', async () => {
    mockingoose(models.GameDetails).toReturn(['windows', 'mac', 'linux'], 'distinct');

    const res = await request(app).get('/api/game/platforms?platforms=mac,linux');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['windows']);
  });
});
