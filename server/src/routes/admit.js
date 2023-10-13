import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/count', controllers.getCountAdmits);
router.post('/create', controllers.createAdmits);

export default router;