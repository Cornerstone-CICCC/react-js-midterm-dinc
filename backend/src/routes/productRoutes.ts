import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductList,
  getProducts,
  updateProduct,
} from '../controllers/productController';
import protect from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/search', getProductList);
router.get('/:id', getProductById);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
