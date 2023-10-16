import express from 'express';
import * as authController from '../controllers';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot', authController.forgotPassword);

export default router;