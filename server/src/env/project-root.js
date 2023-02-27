import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
);

const projectRoot = path.normalize(path.join(
  __dirname, '..', '..', '..'
));

export default projectRoot;

