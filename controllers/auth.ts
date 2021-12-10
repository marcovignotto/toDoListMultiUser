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

/**
 * @desc GET route
 * @path /
 * @private
 * @return all the user's info
 */
const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  console.log("getUserInfo");
  console.log("req", req.body);
  console.log("req", req);
  console.log("req", req.cookies.access_token);
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
      user: { id: user.id, role: user.role },
    };

    // creates and returns a token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // for development: expires in 30days
      { expiresIn: "30d" },
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

export { postToGetToken, getUserInfo };
