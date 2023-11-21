import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getSamples)
router.get('/type', controllers.getTypeSamples)
router.put('/update', controllers.updateSamples)
router.get('/limit', controllers.getLimitSamples)
router.post('/create', controllers.createSamples)
router.get('/group', controllers.getCategorySamples)

export default router;