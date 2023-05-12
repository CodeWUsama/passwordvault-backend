import express from 'express';

import { handleSignup } from '../controllers/users.js';

const router = express.Router();

router.post('/', handleSignup);

export default router;
