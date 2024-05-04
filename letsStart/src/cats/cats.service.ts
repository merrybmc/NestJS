import { Cat, CatType } from './cats.model';
import { Request, Response } from 'express';

// CRUD 서비스 패턴 적용

// READ 모든 데이터 조회
export const readAllCat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    if (!cats) throw new Error('empty in cats');

    res.status(200).json({ data: cats });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ 특정 데이터 조회
// dynamic routing
export const readCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('cannot find id');

    const cat = Cat.find((cat: CatType) => cat.id === id);

    if (!id) throw new Error('cannot find data');

    res.status(200).json({ cat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// CREATE
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data) throw new Error('cannot read data');

    Cat.push(data);

    res.status(200).json({ Cat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE PUT
export const updateCat = (req: Request, res: Response) => {
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
};

// DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('cannot find id');

    const newCat = Cat.filter((cat) => cat.id !== id);

    res.status(200).json({ data: newCat });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
