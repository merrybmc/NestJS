import * as express from 'express';
import catsRouter from './cats/cats.route';

const app = express();
const port = 8000;

app.use(express.json());

app.listen(port, () => {
  console.log('server connect');
});

app.get('/', (req, res) => {
  res.send('hello world');
});

// logging middleware
// 코드 순서에 영향을 받음
app.use((req, res, next: express.NextFunction) => {
  console.log('this is middleware');
  next();
});

// route 분리
app.use('/cats', catsRouter);
