/**
 * @desc tasks route
 */
import { Router } from "express";

const router = Router();

// CTRLs
const {
  getAllUsersTasks,
  postOneTask,
  getSpecificTaskById,
  putUpdateOneTask,
  deleteOneTask,
} = require("../controllers/tasks");

// Middleware
import authorization from "../middleware/authorization";

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's tasks
 */

router.get("/", authorization, getAllUsersTasks);

/**
 * @desc GET route
 * @path /:id
 * @private
 * @return returns ONE user's tasks based on param _id i.e. tasks/a1f2g34y5ud6789
 */

router.get("/:_id", authorization, getSpecificTaskById);

/**
 * @desc POST route
 * @path /
 * @private
 * @return post a task
 */

router.post("/", authorization, postOneTask);

/**
 * @desc PUT route
 * @path /:id
 * @private
 * @return update a specific task based on param _id i.e. tasks/a1f2g34y5ud6789
 */

router.put("/:_id", authorization, putUpdateOneTask);

/**
 * @desc DELETE route
 * @path /:id
 * @private
 * @return delete a specific task based on param _id i.e. tasks/a1f2g34y5ud6789
 */

router.delete("/:_id", authorization, deleteOneTask);

export default router;
