import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getSamples);
router.get('/type', controllers.getTypeSamples);
router.get('/limit', controllers.getLimitSamples);
router.get('/group', controllers.getCategorySamples)
router.post('/create', controllers.createSamples)
router.put('/update', controllers.updateSamples)

export default router;