import path from 'path';

import * as dotenv from 'dotenv';

import projectRoot from './project-root.js';


dotenv.config({
  path: path.join(
    projectRoot,
    '.env'
  )
});

