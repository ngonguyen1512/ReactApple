import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getAccounts)
router.get('/one', controllers.getAccountOne)
router.get('/count', controllers.getCountAccounts)
router.put('/updateinfo', controllers.updateInfoAccounts)
router.put('/updatestate', controllers.updateStateAccounts)

export default router;