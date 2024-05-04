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

// middleware
// 코드 순서에 영향을 받음
app.use((req, res, next: express.NextFunction) => {
  console.log('this is middleware');
  next();
});

app.get('/cats/blue', (req, res) => {
  res.send({ blue: Cat[0] });
});
