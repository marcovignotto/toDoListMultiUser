/**
 * @desc CTRL for tasks
 */

import { Request, Response, NextFunction } from "express";

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
