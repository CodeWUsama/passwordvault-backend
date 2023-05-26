import express from 'express';
import { getAllCategories, createCategory } from '../controllers/categories.js';
import tryCatchWrapper from '../helpers/tryCatchHelper.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, tryCatchWrapper(getAllCategories));
router.post('/', authenticateToken, tryCatchWrapper(createCategory));

export default router;
