import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/count', controllers.getCountInvoices);

export default router;