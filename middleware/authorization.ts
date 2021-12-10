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
  // create payload

  let tokenToVerify: string = "";

  // for testing purposals
  // get the token from the header
  if (req.body?.config?.header["Set-Cookie"].length > 0) {
    tokenToVerify = req.body.config.header["Set-Cookie"];
  }

  if (tokenToVerify === "") {
    return next({
      success: false,
      msg: "No Token, no auth!",
      status: 401,
    });
  }

  // verify token
  const decodedTokenInfo = jwt.verify(tokenToVerify, process.env.JWT_SECRET);

  // insert decoded user and token into req
  req.body.data = {
    _id: decodedTokenInfo.user._id,
    token: tokenToVerify,
  };

  next();
};

export default authorization;
