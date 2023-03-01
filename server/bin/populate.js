#!/bin/env node

import '../src/env/env.js';
import db from '../src/db/db.js';
import utils from '../src/db/utils.js';
import models from '../src/db/models.js';
import steam from '../src/controller/steamapi/steam_api.js';
import utilsPromises from '../src/controller/utils/promises.js';

const GAME_IDS = [
  225840,
  630,
  224260,
  13570,
  440,
  365450,
  2280,
  100,
  367520,
  506540,
];

main();


async function main() {
  await db.connect('620-recogame');

  for (const id of GAME_IDS) {
    try {
      console.log(`- ${id}`);
      console.log('  - Fetching');

      await utilsPromises.sleep(1);
      const details = await steam.fetchGameInfo(id);

      // Details
      console.log('  - Inserting details');
      const insertedDetails = await utils.runIgnoreMongoErrors(
        async () => await models.GameDetails.create(details),
        11000
      );
      if (!insertedDetails) {
        console.log('    - Was already in DB');
      }

      // All Games
      console.log('  - Inserting game entry');
      const insertedGameEntry = await utils.runIgnoreMongoErrors(
        async () => {
          return models.AllGames.create({
            appid: details.steamId,
            name: details.name
          });
        },
        11000
      );
      if (!insertedGameEntry) {
        console.log('    - Was already in DB');
      }
    } catch (e) {
      console.log('  - Error');
      console.error(e);
    }
  }

  await db.disconnect();
}
