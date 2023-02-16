#!/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import '../src/env/env.js';


const argv = yargs(hideBin(process.argv))
  .command(
    // Steam
    'steam', 'Fetch some data from steam',
    (yargs) => {
      return yargs
        // All
        .command(
          'all', 'Fetch all IDs and names'
        )
        // Info <id>
        .command(
          'info', 'Fetch info about a game with specified ID',
          (yargs) => {
            yargs.option(
              'i', {
                alias: 'id',
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

console.log(argv);

