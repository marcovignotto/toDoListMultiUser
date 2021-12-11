/**
 * @desc CTRL for tasks
 */

import { Request, Response, NextFunction } from "express";

// * Models

const Task = require("../models/Task");
const User = require("../models/User");

interface IRequestBody {
  token: string;
}

interface IGetAllTasksResponse {
  success: boolean;
  data: Array<object>;
}

/**
 * @desc GET route
 * @path /
 * @private
 * @return returns all the user's tasks
 */

exports.getAllUsersTasks = async (
  req: Request<IRequestBody>,
  res: Response<IGetAllTasksResponse>,
  next: NextFunction
) => {
  try {
    // the id is returned by the auth middleware
    const { _id, token } = req.body.data;

    const userData = await User.findOne({
      _id: _id,
    })
      .select("tasks")
      .exec();

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      error: "Not able to get the requested data!",
    });
  }
};
