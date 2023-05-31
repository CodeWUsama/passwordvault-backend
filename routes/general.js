import express from 'express';
import getResponseCodes from '../controllers/general.js';
import tryCatchWrapper from '../helpers/tryCatchHelper.js';

const router = express.Router();

router.get('/response_codes', tryCatchWrapper(getResponseCodes));

export default router;
