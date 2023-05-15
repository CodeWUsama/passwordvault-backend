import express from 'express';

import handleLogin from '../controllers/auth.js';
import handleSignup from '../controllers/registration.js';

const router = express.Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);

export default router;
