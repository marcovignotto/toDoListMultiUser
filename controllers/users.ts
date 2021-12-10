/**
 * @desc CTRL for users
 */

import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";
import crypto from "crypto";

// * Models
const User = require("../models/User");

// * Interfaces

interface ISavedUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userCode: string;
  _id: string;
  success: boolean;
}

interface ICallError {
  status: string;
  success: boolean;
  error: string;
}

interface RequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  userCode?: string;
}

/**
 * @desc POST route
 * @path /
 * @private
 * @return creates a user
 */

exports.postNewUser = async (
  req: Request<RequestBody>,
  res: Response<ISavedUser>,
  next: NextFunction
) => {
  let { password, email } = req.body.data;

  try {
    // check if email is already in use
    const signupEmail = await User.findOne({ email });

    if (signupEmail) {
      return next({
        status: 409,
        success: false,
        msg: "Email already exists!",
      });
    }
    // generate salt
    let salt = await bcrypt.genSalt(10);

    // generate Password
    let hashedPassword = await bcrypt.hash(password, salt);

    // generate accountCode
    const generatedAccountCode = crypto.randomBytes(6).toString("hex");
    // create the new obj to save

    const userToSave = new User({
      ...req.body.data,
      password: hashedPassword,
      userCode: generatedAccountCode,
    });

    const savedDocument: ISavedUser = await userToSave.save();

    return res.json({
      firstName: savedDocument.firstName,
      lastName: savedDocument.lastName,
      email: savedDocument.email,
      role: savedDocument.role,
      userCode: savedDocument.userCode,
      _id: savedDocument._id,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return next({
      status: 404,
      success: false,
      msg: "User not created!",
    });
  }
};

/**
 * @desc PUT route
 * @path /
 * @private
 * @return updates a user
 */

exports.putUser = async (
  req: Request<RequestBody>,
  res: Response<ISavedUser>,
  next: NextFunction
) => {
  // id for the update
  const { _id } = req.body.data;

  try {
    // find and update using the mongo _id
    const userUpdated = await User.findOneAndUpdate(
      { _id: _id },
      req.body.data,
      {
        new: true,
      }
    );

    return res.json({
      firstName: userUpdated.firstName,
      lastName: userUpdated.lastName,
      email: userUpdated.email,
      role: userUpdated.role,
      userCode: userUpdated.userCode,
      _id: userUpdated._id,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return next({
      status: 404,
      success: false,
      msg: "User not updated!",
    });
  }
};
