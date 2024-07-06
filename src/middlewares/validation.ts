import { NextFunction,Response,Request } from "express";

const Joi = require('joi');

const validationMiddleware = (schema: { validate: (arg0: any) => { error: any; }; }) => {
  return (req:Request, res: Response, next:NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i: { message: any; }) => i.message).join(',');
      const err = new Error(message);

      err.status = 422;
      return next(err);
    }
  };
};

export default  validationMiddleware;