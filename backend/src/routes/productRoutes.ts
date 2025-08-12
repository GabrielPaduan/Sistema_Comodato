import express from 'express';
import { getAllProducts, createProduct, getProductByContractId, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/search/:id', getProductById);
router.get('/product-contract/:id', getProductByContractId);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

export default router;