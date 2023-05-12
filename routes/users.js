import express from "express";
const router = express.Router();

import { handleSignup } from "../controllers/users.js";

router.post("/", handleSignup);

export default router;
