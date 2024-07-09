require("dotenv").config();
import express, { Express, NextFunction, Request, Response } from "express";
import messages from "./src/constants/messages";
import response from "./src/utils/response";
import cors from "cors"
import displayRoutes from 'express-routemap';
const app: Express = express();
import authRoute from "./src/routes/auth"
import userRoute from "./src/routes/user"
import organisationRoute from "./src/routes/organisation"

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return response({res, code:200, message:messages.welcomeMessage});
});

app.use('/auth', authRoute)
app.use("/api", userRoute);
app.use("/api/organisations", organisationRoute);


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
    displayRoutes(app);
});

app.use((req,res)=>{
    response({res, code: 404, message: messages.invalidRoute});
})

app.use((err:Error, req: Request, res: Response,next: NextFunction)=>{
  if (process.env.NODE_ENV != "production"){
    console.log(err)
  }
  return response(
   { res,
   code: 500,
    message:`Something went wrong, please try again later!n`}
  );
})

export default app