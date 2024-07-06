require("dotenv").config();
import express, { Express, NextFunction, Request, Response } from "express";
import messages from "./src/constants/messages";
import response from "./src/utils/response";
import cors from "cors"
// const app = express();
import {HttpError} from "./src/utils/httpResponse"
const app: Express = express();
import authRoute from "./src/routes/user"
const PORT = process.env.PORT || 3000;
app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  return response(res, 200, messages.welcomeMessage);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
app.use('/auth', authRoute)

app.use(function (err:Response, req:Request, res:Response, next:NextFunction) {
  console.log(err)
  //check if it is database error, if yes, dont display the postgre error
  if (err.client === 'postre') {
    return response(res,500,'Something went wrong. Kindly try again later.')
    ;
  }
  return response(err, err.status || 500,err.message||messages.serverError )

});