const jwt = require("jsonwebtoken");
require("dotenv").config();

import { NextFunction, Request, Response } from "express";

import messages from "../constants/messages";
import response from "../utils/response";

const Authorization = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string = req.headers.authorization || "";
  console.log(authorization);
  try {
    if (!authorization) throw new Error(messages.unauthorisedAccess);

    const tokenSplit: string[] = authorization.split(" ");

    jwt.verify(
      tokenSplit[1],
      process.env.JWT_SECRET,
      (err: any, decoded: { email: string }) => {
        console.log(err);
        if (err) throw new Error(messages.unauthorisedAccess);

        req.params.userEmail = decoded.email;

        next();
      }
    );
  } catch (error: any) {
    response({
      res,
      code: 401,
      message: error.message || messages.serverError,
    });
  }
};

export default Authorization;
