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
  console.log("req", req.body.config.header.split(" : "));

  let tokenToVerify: string = "";

  if (req.body.config.header) {
  }

  const token = await req.cookies.access_token;

  // ! disabled
  //   return next();
};

export default authorization;
