import express from 'express';
import { getAllCategories, createCategory, getCategoryPasswords } from '../controllers/categories.js';
import tryCatchWrapper from '../helpers/tryCatchHelper.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, tryCatchWrapper(getAllCategories));
router.post('/', authenticateToken, tryCatchWrapper(createCategory));
router.get('/:id', authenticateToken, tryCatchWrapper(getCategoryPasswords));

export default router;
