import { Router } from 'express';

import { createUser, login } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/user', createUser);
router.post('/user/login', login);

export default router;
