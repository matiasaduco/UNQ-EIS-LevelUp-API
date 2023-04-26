import { Router } from 'express';
import { login, signin } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signin', signin);
router.post('/login', login);

export default router;
