/**
 * @desc users route to manage the user
 * creates and updates users
 */

import { Router } from "express";

// CTRLs
const { postNewUser, putUser } = require("../controllers/users");

const router = Router();

/**
 * @desc POST route
 * @path /
 * @private
 * @return creates a user
 */

router.post("/", postNewUser);

/**
 * @desc PUT route
 * @path /
 * @private
 * @return updates a user
 */

router.put("/", putUser);

export default router;
