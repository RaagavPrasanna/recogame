#!/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import steam from '../src/controller/steamapi/steam_api.js';
import '../src/env/env.js';


const argv = yargs(hideBin(process.argv))
  .demandCommand(1, 'Specify a source')
  .command(
    // Steam
    'steam', 'Fetch some data from steam',
    (yargs) => {
      return yargs
        .demandCommand(1, 'Specify what to fetch')
        // All
        .command(
          'all', 'Fetch all IDs and names'
        )
        // Info <id>
        .command(
          'info', 'Fetch info about a game with specified ID',
          (yargs) => {
            yargs.option(
              'id', {
                alias: 'i',
                type: 'number',
                demandOption: true
              }
            );
          }
        );
    }
  )
  .help()
  .argv;

main();

async function main() {
  if (argv._[0] === 'steam') {
    // Steam
    if (argv._[1] === 'all') {
      // All
      console.log(await steam.fetchAllSteamApps());
    } else if (argv._[1] === 'info') {
      // Info
      try {
        console.log(await steam.fetchGameInfo(argv.id));
      } catch (e) {
        console.error(`Cannot fetch game with ID ${argv.id}`);
        console.error(e);
        process.exit(1);
      }
    }
  }
}
