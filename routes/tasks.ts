/**
 * @desc tasks route
 */
import { Router } from "express";

const router = Router();

// CTRLs
const { getAllUsersTasks } = require("../controllers/tasks");

// Middleware
import authorization from "../middleware/authorization";

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's tasks
 */

router.get("/", authorization, getAllUsersTasks);

export default router;
