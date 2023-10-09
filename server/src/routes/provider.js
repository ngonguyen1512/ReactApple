import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getProviders);
router.post('/create', controllers.createProviders)
router.put('/update', controllers.updateProviders)

export default router;