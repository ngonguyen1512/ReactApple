import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getProducts);
router.get('/newproduct', controllers.getNewProducts);
router.get('/limit', controllers.getProductsLimit);
router.post('/create', controllers.createProducts);
router.put('/update', controllers.updateProducts);

export default router;