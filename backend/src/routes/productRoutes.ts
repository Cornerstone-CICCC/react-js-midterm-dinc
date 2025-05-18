import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductList,
  getProducts,
  updateProduct,
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/search', getProductList);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
