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
  token: string;
  success: boolean;
}

interface RequestBody {
  email: string;
  password: string;
  userCode?: string;
}

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's info
 */
exports.getUserInfo = async (
  req: Request<RequestBody>,
  res: Response,
  next: NextFunction
) => {};

/**
 * @desc POST route
 * @path /
 * @private
 * @return to get a token
 */

exports.postToGetToken = async (
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
      user: { id: user.id },
    };

    // creates and returns a token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // for development: expires in 30days
      {},
      (err, token) => {
        if (err) {
          return next({
            status: 404,
            success: false,
            msg: "Something went wrong with the token!",
          });
        }

        return res.json({ success: true, token: token });
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
