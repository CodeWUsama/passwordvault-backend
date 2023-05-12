import express from "express";
const router = express.Router();

import { getResponseCodes } from "../controllers/general.js";

router.get("/response_codes", getResponseCodes);

export default router;
