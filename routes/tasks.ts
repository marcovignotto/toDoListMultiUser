/**
 * @desc tasks route
 */
import { Router } from "express";

const router = Router();

// CTRLs
const { getAllUsersTasks } = require("../controllers/tasks");

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's tasks
 */

router.get("/", getAllUsersTasks);

export default router;
