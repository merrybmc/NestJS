import { Cat, CatType } from './cats.model';

// typescript ver import
import { Router } from 'express';
import { createCat, deleteCat, readAllCat, readCat, updateCat } from './cats.service';
const router = Router();

router.get('/', readAllCat);
router.get('/:id', readCat);
router.post('/', createCat);
router.put('/', updateCat);
router.delete('/', deleteCat);

export default router;
