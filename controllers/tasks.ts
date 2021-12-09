/**
 * @desc CTRL for tasks
 */

import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();

// * Models

exports.getAllUsersTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      error: "Not able to get the requested data!",
    });
  }
};
