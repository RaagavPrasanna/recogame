#!/bin/env node

import '../src/env/env.js';
import db from '../src/db/db.js';
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


/**
 * Run the insert callback ignoring the duplicates.
 * @param {() => Promise} callback Insert callback.
 * @returns boolean Whether the element was inserted.
 */
async function runIgnoreMongoDuplicateError(callback) {
  try {
    await callback();
  } catch (e) {
    if (e.code !== 11000) {
      throw e;
    } else {
      return false;
    }
  }
}

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
      const insertedDetails = await runIgnoreMongoDuplicateError(() => {
        return models.GameDetails.create(details);
      });
      if (!insertedDetails) {
        console.log('    - Was already in DB');
      }

      // All Games
      console.log('  - Inserting game entry');
      const insertedGameEntry = await runIgnoreMongoDuplicateError(() => {
        return models.AllGames.create({
          appid: details.steamId,
          name: details.name
        });
      });
      if (!insertedGameEntry) {
        console.log('    - Was already in DB');
      }
    } catch (e) {
      console.log('  - Error');
      console.error(e);
    }
  }

  db.disconnect();
}
