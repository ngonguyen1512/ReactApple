import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getProviders)
router.put('/update', controllers.updateProviders)
router.post('/create', controllers.createProviders)

export default router;