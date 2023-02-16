#!/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import '../src/env/env.js';

// Arguments
const argv = yargs(hideBin(process.argv))
  .command(
    'steam', 'Fetch infomration from Steam API', {
      type: {
        describe: 'Kind of infomration to fetch from steam',
        alias: 't',
        demand: true
      }
    }
  )
  .help()
  .argv;

console.log(argv);

