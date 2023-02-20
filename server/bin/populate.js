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
  9480,
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
        models.AllGames.create(a);
      } catch (e) {
        if (e?.code === 11000) {
          console.error(`    - Could not insert ${a.appid}, skipping`);
        } else {
          throw e;
        }
      }
    }

    // Specific games
    console.log('Fetching game info');
    await utilsPromises.throttleResolve(
      GAMES_FOR_DETAILS.slice(0, 10).map((g) => async () => {
        console.log(`  - Fetching ${g}`);
        const d = await steam.fetchGameInfo(g);
        try {
          models.GameDetails.create(d);
        } catch (e) {
          if (e?.code === 11000) {
            console.error(`    - Could not insert ${d.steamid}, skipping`);
          } else {
            throw e;
          }
        }
      }),
      1
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

