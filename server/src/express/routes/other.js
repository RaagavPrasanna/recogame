import express from 'express';


const router = express.Router();

router.use(express.json());

router.get('*', (_, res) => {
  res.status(404).send('Requested page not found');
});


export default router;


