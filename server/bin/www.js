#!/bin/env node

import '../src/env/env.js';

import app from '../src/express/app.js';
import db from '../src/db/db.js';

const PORT = process.env.PORT || 3001;
const EXIT_SIGNALS = ['exit', 'SIGTERM', 'SIGINT'];

main();

async function main() {
  await db.connect('620-recogame');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  for (const signal of EXIT_SIGNALS) {
    process.on(signal, async() => {
      await db.disconnect();
      process.exit(0);
    });
  }
}

