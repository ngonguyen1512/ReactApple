import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getSlider);

export default router;