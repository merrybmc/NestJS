import { Cat, CatType } from './cats.model';

// typescript ver import
import { Router } from 'express';
const router = Router();

router.get('/blue', (req, res) => {
  res.send({ blue: Cat[0] });
});

// CRUD

// READ 모든 데이터 조회
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('cannot find id');

    const cat = Cat.find((cat: CatType) => cat.id === id);

    if (!id) throw new Error('cannot find data');

    res.status(200).json({ cat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// CREATE
router.post('/', (req, res) => {
  try {
    const data = req.body;

    if (!data) throw new Error('cannot read data');

    Cat.push(data);

    res.status(200).json({ Cat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE PUT
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('cannot find id');

    const body = req.body;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });

    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('cannot find id');

    const newCat = Cat.filter((cat) => cat.id !== id);

    res.status(200).json({ data: newCat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
