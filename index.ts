require("dotenv").config();
import express, { Express, Request, Response } from "express";
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
