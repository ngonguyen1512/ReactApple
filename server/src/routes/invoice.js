import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/count', controllers.getCountInvoices);
router.post('/create', controllers.createInvoices);

export default router;