import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getSlider);
router.post('/create', controllers.createSliders);
router.delete('/delete', controllers.deleteSliders);
router.put('/update', controllers.updateSliders);

export default router;