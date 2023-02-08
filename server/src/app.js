import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

async function main() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  app.get('/*', (_, res) => {
    res.send('Working');
  });
}

main();

