import express from 'express';
import { handleGetPasswords, handlePostPasswords } from '../controllers/passwords.js';
import tryCatchWrapper from '../helpers/tryCatchHelper.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, tryCatchWrapper(handleGetPasswords));
router.post('/', authenticateToken, tryCatchWrapper(handlePostPasswords));

export default router;
