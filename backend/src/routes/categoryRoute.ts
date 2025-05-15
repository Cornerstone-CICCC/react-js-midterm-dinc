import { Router } from 'express';
import {
  getCategories,
  seedCategories,
} from '../controllers/categoryController';

const router = Router();

router.get('/', getCategories);
router.get('/seed', seedCategories);

export default router;
