import express from "express";
const router = express.Router();

import authentication from "../middlewares/authentication";
import { getUserDetails } from "../controllers/user";
import Authorization from "../middlewares/authorization";

import validationMiddleware from "../middlewares/validation";

router.get("/users/:id", Authorization, authentication, getUserDetails);

export default router;
