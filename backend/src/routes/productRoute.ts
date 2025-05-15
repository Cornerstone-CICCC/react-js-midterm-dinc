import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProdctById,
  getProducts,
  updateProduct,
} from '../controllers/productController';

const router = Router();

router.get('/:id', getProdctById);
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
