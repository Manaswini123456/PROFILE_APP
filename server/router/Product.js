// routes/product.js
import express from 'express';
import { createProduct, getProducts } from '../controllers/Product.controller.js';
import { verifyUser } from '../controllers/appController.js';

const router = express.Router();

router.post('/create', verifyUser, createProduct);
router.get('/all', getProducts);

export default router;
