import express from 'express';
import { getAllProducts, createProduct, getProductByContractId } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getProductByContractId);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

export default router;