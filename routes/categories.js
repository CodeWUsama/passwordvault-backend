import express from 'express';
import { handleGetCategories, handlePostCategory } from '../controllers/categories.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, handleGetCategories);
router.post('/', authenticateToken, handlePostCategory);

export default router;
