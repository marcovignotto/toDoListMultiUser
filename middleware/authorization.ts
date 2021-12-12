/**
 * @desc auth middleware to check the user's token via cookie
 */

require("dotenv").config({ path: __dirname + "/.env" });
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  // msg no token
  const error401Message = () => {
    return next({
      success: false,
      msg: "No Token, no auth!",
      status: 401,
    });
  };

  try {
    // create payload

    let tokenToVerify: string = "";

    // if empty header or undefined
    if (
      req.body?.config?.header === undefined ||
      Object.keys(req.body?.config?.header).length === 0
    ) {
      return error401Message();
    }

    // for testing purposals
    // get the token from the header
    if (req.body?.config?.header["Set-Cookie"].length > 0) {
      tokenToVerify = req.body.config.header["Set-Cookie"];
    }

    // if no token
    if (tokenToVerify === "") {
      return error401Message();
    }

    // verify token
    const decodedTokenInfo = jwt.verify(tokenToVerify, process.env.JWT_SECRET);

    // insert decoded user and token into req
    req.body.user = {
      _id: decodedTokenInfo.user._id,
      userCode: decodedTokenInfo.user.userCode,
      role: decodedTokenInfo.user.role,
      token: tokenToVerify,
    };

    next();
  } catch (error) {
    return next({
      success: false,
      msg: "Authorization error!",
      status: 401,
    });
  }
};

export default authorization;
