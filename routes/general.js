import express from 'express';
import { getResponseCodes } from '../controllers/general.js';

const router = express.Router();

router.get('/response_codes', getResponseCodes);

export default router;
