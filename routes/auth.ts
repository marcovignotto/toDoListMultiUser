/**
 * @desc auth route to allow user
 */

import { Router } from "express";

// CTRLs
import { getUserData, postToGetToken } from "../controllers/auth";

// Middleware
import authorization from "../middleware/authorization";

const router = Router();

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's info
 */

router.get("/", authorization, getUserData);

/**
 * @desc POST route
 * @path /
 * @private
 * @return to get a token
 */

router.post("/", postToGetToken);

export default router;
