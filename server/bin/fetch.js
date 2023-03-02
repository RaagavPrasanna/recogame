#!/bin/env node

import '../src/env/env.js';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import steam from '../src/controller/steamapi/steam_api.js';
import igdb from '../src/controller/igdbapi/igdb_api.js';


const argv = yargs(hideBin(process.argv))
  .demandCommand(1, 'Specify a source')
  // Steam
  .command(
    'steam', 'Fetch some data from Steam',
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
            return yargs.option(
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
  // IGDB
  .command(
    'igdb', 'Fetch some data from IGDB',
    (yargs) => {
      return yargs
        .demandCommand(1, 'Specify what to fetch')
        // All
        .command(
          'all', 'Fetch all IDs and names'
        )
        // Info <id> || <name>
        .command(
          'info', 'Fetch info about a game with specified ID',
          (yargs) => {
            return yargs
              .option(
                'id', {
                  alias: 'i',
                  type: 'number'
                }
              )
              .option(
                'name', {
                  alias: 'n',
                  type: 'string'
                }
              )
              .check((argv) => {
                if (argv.id && argv.name) {
                  throw new Error('Pass either the name or id, but not both');
                } else if (!argv.id && !argv.name) {
                  throw new Error('Pass either the name or id');
                } else {
                  return true;
                }
              });
          }
        );
    }
  )
  .help()
  .argv;

main();

async function main() {
  try {
    if (argv._[0] === 'steam') {
      // Steam
      if (argv._[1] === 'all') {
        // All
        console.log(JSON.stringify(await steam.fetchAllSteamApps()));
      } else if (argv._[1] === 'info') {
        // Info
        console.log(JSON.stringify(await steam.fetchGameInfo(argv.id)));
      }
    } else if (argv._[0] === 'igdb') {
      // IGDB
      if (argv._[1] === 'all') {
        // All
        console.log(JSON.stringify(await igdb.fetchAllIgdbApps()));
      } else if (argv._[1] === 'info') {
        // Info
        if (argv.id) {
          console.log(JSON.stringify(await igdb.fetchGameInfoId(argv.id)));
        } else {
          console.log(JSON.stringify(await igdb.fetchGameInfoWord(argv.name)));
        }
      }
    }
  } catch (e) {
    console.error(`Cannot fetch game with ID ${argv.id}`);
    console.error('===');
    console.error(e);
    process.exit(1);
  }
}

