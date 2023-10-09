import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getAccounts);
router.get('/one', controllers.getAccountOne);
router.get('/count', controllers.getCountAccounts);
router.put('/updatestate', controllers.updateStateAccounts)
router.put('/updateinfo', controllers.updateInfoAccounts)

export default router;