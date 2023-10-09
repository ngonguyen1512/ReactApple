import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getTransfers);
router.post('/create', controllers.createTransfers);
router.delete('/delete', controllers.deleteTransfers);
router.put('/update', controllers.updateTransfers);

export default router;