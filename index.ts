require("dotenv").config();
import express, { Express, NextFunction, Request, Response } from "express";
import messages from "./src/constants/messages";
import response from "./src/utils/response";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  return response(res, 200, messages.welcomeMessage);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

app.use(function (err, req:Request, res:Response, next:NextFunction) {
  console.log(err)
  //check if it is database error, if yes, dont display the postgre error
  if (err.client in err && err.client === 'postre') {
    return response(res,500,'Something went wrong. Kindly try again later.')
    ;
  }
  return response(err, err.status || 500,err.message||messages.serverError )

});