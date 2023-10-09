import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getPrices);

export default router;