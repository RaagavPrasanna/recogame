import express from 'express';


const router = express.Router();

router.use(express.json());

router.get('*', (_, res) => {
  res.send('Hello world');
});


export default router;

