import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getSlider)
router.put('/update', controllers.updateSliders)
router.post('/create', controllers.createSliders)
router.delete('/delete', controllers.deleteSliders)
s
export default router;