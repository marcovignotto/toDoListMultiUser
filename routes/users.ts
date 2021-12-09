/**
 * @desc users route to manage the user
 * creates and updates users
 */

import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();

/**
 * @desc POST route
 * @path /
 * @private
 * @return creates a user
 */

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    console.log(error);
    return next({
      status: 404,
      success: false,
      error: "User not created!",
    });
  }
});

/**
 * @desc PATCH route
 * @path /
 * @private
 * @return updates a user
 */

export default router;
