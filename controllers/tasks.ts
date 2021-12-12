/**
 * @desc CTRL for tasks
 */

import { Request, Response, NextFunction } from "express";

// * Models

const Task = require("../models/Task");
const User = require("../models/User");

interface IRequestBody {
  token: string;
  params?: object;
}

interface IGetAllTasksResponse {
  success: boolean;
  tasks: Array<object>;
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
    const { _id, token } = req.body.user;

    const userData = await User.findOne({
      _id: _id,
    }).populate("allTasks");

    res.status(200).json({ success: true, tasks: userData.tasks });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      error: "Not able to get the requested data!",
    });
  }
};

/**
 * @desc GET route
 * @path /:id
 * @private
 * @return returns ONE user's tasks based on param _id i.e. tasks/a1f2g34y5ud6789
 */
exports.getSpecificTaskById = async (
  req: Request<IRequestBody>,
  res: Response<IPostTaskResponse>,
  next: NextFunction
) => {
  try {
    // get id
    const { _id } = req.params;
    // task
    const taskToReturn = await Task.findById(_id).exec();

    return res.json({ success: true, task: taskToReturn });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      error: "Not able to get the task!",
    });
  }
};

// used by post and put
interface IPostTaskResponse {
  success: boolean;
  task: object;
}

export interface IPostTaskRequest {
  user: { _id: string; token: string };
  task: { title: string; details: string; priority: string; done: boolean };
}

/**
 * @desc POST route
 * @path /
 * @private
 * @return post a task
 */

exports.postOneTask = async (
  req: Request<IPostTaskRequest>,
  res: Response<IPostTaskResponse>,
  next: NextFunction
) => {
  try {
    // get data
    const { task, user } = req.body;

    // check data and return errors
    if (task.title === "") {
      return next({
        status: 400,
        success: false,
        msg: "The task needs a title",
      });
    }
    if (task.priority === "") {
      return next({
        status: 400,
        success: false,
        msg: "The task needs a priority",
      });
    }

    // create task
    const taskToPost = new Task({ ...task, ownerUserCode: user.userCode });

    // save task
    await taskToPost.save();

    // add task id into user.tasks array
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $addToSet: { tasks: taskToPost._id },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        }
      }
    ).clone();

    return res.json({ success: true, task: taskToPost });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      msg: "Not able to post a task!",
    });
  }
};

/**
 * @desc PUT route
 * @path /:id
 * @private
 * @return update a specific task
 */

exports.putUpdateOneTask = async (
  req: Request<IRequestBody>,
  res: Response<IPostTaskResponse>,
  next: NextFunction
) => {
  try {
    // get id
    const { _id } = req.params;
    // get task
    const { task } = req.body;

    // get task
    // const taskToReturn = await Task.findById(_id).exec();
    const updatedTaskToReturn = await Task.findOneAndUpdate(
      { _id: _id },
      task,
      { new: true }
    ).exec();

    return res.json({ success: true, task: updatedTaskToReturn });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      error: "Not able to update the task!",
    });
  }
};

/**
 * @desc DELETE route
 * @path /:id
 * @private
 * @return delete a specific task
 */

exports.deleteOneTask = async (
  req: Request<IRequestBody>,
  res: Response<IPostTaskResponse>,
  next: NextFunction
) => {
  try {
    // get id
    const { _id } = req.params;

    // const taskToReturn = await Task.findById(_id).exec();
    const deletedTaskToReturn = await Task.findByIdAndRemove(_id);

    if (!deletedTaskToReturn) {
      return next({
        status: 400,
        success: false,
        error: "Not able to delete the task!",
      });
    }

    return res.json({ success: true, task: deletedTaskToReturn });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
      error: "Not able to delete the task!",
    });
  }
};
