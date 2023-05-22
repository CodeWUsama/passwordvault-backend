import express from 'express';
import { handleGetPasswords, handlePostPasswords } from '../controllers/passwords.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, handleGetPasswords);
router.post('/', authenticateToken, handlePostPasswords);

export default router;
