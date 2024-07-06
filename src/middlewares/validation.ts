import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import response from "../utils/response";
const messages = require("../constants/messages");

const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
      return next();
    }

    const message = error.details.map((i: Joi.ValidationErrorItem) => i.message).join(', ');

    response(res, 422, message || messages.validationError);
  };
};

export default validationMiddleware;
