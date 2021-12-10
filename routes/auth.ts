/**
 * @desc auth route to allow user
 */

import { Router } from "express";
import { Request, Response, NextFunction } from "express";

// CTRLs
const { getUserInfo, postToGetToken } = require("../controllers/auth");

const router = Router();

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's info
 */

router.get("/", getUserInfo);

/**
 * @desc POST route
 * @path /
 * @private
 * @return to get a token
 */

router.post("/", postToGetToken);

export default router;
