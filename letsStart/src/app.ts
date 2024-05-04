import * as express from 'express';
import { Cat, CatType } from './app.model';
import { error } from 'console';

const app = express();
const port = 8000;

app.use(express.json());

const data = [1, 2, 3, 4];

app.listen(port, () => {
  console.log('server connect');
});

app.get('/', (req, res) => {
  res.send({ Cat });
});

// logging middleware
// 코드 순서에 영향을 받음
app.use((req, res, next: express.NextFunction) => {
  console.log('this is middleware');
  next();
});

app.get('/cats/blue', (req, res) => {
  res.send({ blue: Cat[0] });
});

// CRUD

// READ 모든 데이터 조회
app.get('/cats', (req, res) => {
  try {
    const cats = Cat;
    if (!cats) throw new Error('empty in cats');

    res.status(200).json({ data: cats });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// READ 특정 데이터 조회
// dynamic routing
app.get('/cats/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('cannot find id');

    const cat = Cat.find((cat) => cat.id === id);

    if (!id) throw new Error('cannot find data');

    res.status(200).json({ cat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// CREATE
app.post('/cats', (req, res) => {
  try {
    const data = req.body;

    if (!data) throw new Error('cannot read data');

    Cat.push(data);

    res.status(200).json({ Cat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
