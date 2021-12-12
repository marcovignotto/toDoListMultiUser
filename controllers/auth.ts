/**
 * @desc CTRL for authentication
 */

require("dotenv").config({ path: __dirname + "/.env" });
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// * Models
const User = require("../models/User");

// * Interfaces
interface IToken {
  userCode?: string;
  token?: string;
  success: boolean;
}

interface RequestBody {
  email: string;
  password: string;
  userCode?: string;
}

interface IGetUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userCode: string;
  success: boolean;
  token: string;
}

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's info
 */
const getUserData = async (
  req: Request,
  res: Response<IGetUserResponse>,
  next: NextFunction
) => {
  try {
    // the id is returned by the auth middleware
    const { _id, token } = req.body.user;

    const userData = await User.findOne({
      _id: _id,
    })
      .select("-password -__v")
      .exec();

    // return and create the properties
    return res.json({
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      userCode: userData.userCode,
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return next({
      status: 404,
      success: false,
      msg: "Error getting user info",
    });
  }
};

/**
 * @desc POST route
 * @path /
 * @private
 * @return to get a token
 */

const postToGetToken = async (
  req: Request<RequestBody>,
  res: Response<IToken>,
  next: NextFunction
) => {
  try {
    // get params
    const { email, password } = req.body.data;
    // check email
    let user = await User.findOne({ email });
    // if false
    if (!user) {
      return next({
        status: 401,
        success: false,
        msg: "Unauthorized",
      });
    }

    /**
     * @desc compares the provided password with
     * the user password extracted with the email
     */

    const isMatch = await bcrypt.compare(password, user.password);
    // if false
    if (!isMatch) {
      return next({
        status: 401,
        success: false,
        msg: "Unauthorized",
      });
    }

    // create payload
    const payload = {
      user: { _id: user._id, role: user.role, userCode: user.userCode },
    };

    // creates and returns a token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // for development: expires in 30days
      // { expiresIn: "30d" },
      (err, token) => {
        if (err) {
          return next({
            status: 404,
            success: false,
            msg: "Something went wrong with the token!",
          });
        }
        // res.setHeader("Set-Cookie", "visited=true; Max-Age=3000; HttpOnly, Secure");
        return (
          res
            //           .cookie("access_token", token, {
            //             httpOnly: true,
            //             //             secure: process.env.NODE_ENV === "production",
            //             secure: false,
            //           })
            .json({ success: true, token: token })
        );
      }
    );
  } catch (error) {
    console.log(error);
    return next({
      status: 404,
      success: false,
      msg: "Validation error!",
    });
  }
};

export { postToGetToken, getUserData };
