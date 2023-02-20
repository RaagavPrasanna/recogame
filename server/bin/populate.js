#!/bin/env node

import '../src/env/env.js';
import db from '../src/db/db.js';
import models from '../src/db/models.js';
import steam from '../src/controller/steamapi/steam_api.js';
import utilsPromises from '../src/controller/utils/promises.js';

const GAMES_FOR_DETAILS = [
  225840,
  630,
  224260,
  13570,
  440,
  365450,
  2280,
  100,
  367520,
  506540
];

main();

async function main() {
  try {
    await db.connect('620-recogame');

    // All games
    console.log('Fetching all games');
    const apps = await steam.fetchAllSteamApps();
    for (const a of apps.slice(0, 20)) {
      console.log(`  - Saving ${a.appid}`);
      try {
        await models.AllGames.create(a);
      } catch (e) {
        if (e?.code === 11000) {
          console.error(`    - Could not insert ${a.appid}, already exists, skipping`);
        } else {
          throw e;
        }
      }
    }

    // Specific games
    console.log('Fetching game info');
    for (const g of GAMES_FOR_DETAILS) {
      console.log(`  - Fetching ${g}`);
      await utilsPromises.sleep(1);
      const d = await steam.fetchGameInfo(g);
      try {
        await models.GameDetails.create(d);
      } catch (e) {
        if (e?.code === 11000) {
          console.error(`    - Could not insert ${g}, already exists, skipping`);
        } else {
          throw e;
        }
      }
    }
    db.disconnect();
  } catch (e) {
    console.log(e);
    db.disconnect();
    process.exit(1);
  }
}

