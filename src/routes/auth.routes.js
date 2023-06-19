import { Router } from 'express';
import { changePassword, login, signin } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signin', signin);
router.post('/login', login);
router.put('/change/password', changePassword);

export default router;
