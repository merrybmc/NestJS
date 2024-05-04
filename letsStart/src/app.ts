import * as express from 'express';
import { Cat, CatType } from './app.model';

const app = express();
const port = 8000;

const data = [1, 2, 3, 4];

app.listen(port, () => {
  console.log('server connect');
});

app.get('/', (req, res) => {
  res.send({ Cat });
});
