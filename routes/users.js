import express from 'express';

import handleLogin from '../controllers/auth.js';
import handleSignup from '../controllers/registration.js';
import tryCatchWrapper from '../helpers/tryCatchHelper.js';

const router = express.Router();

router.post('/signup', tryCatchWrapper(handleSignup));
router.post('/login', tryCatchWrapper(handleLogin));

export default router;
