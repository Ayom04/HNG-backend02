import express from "express";
const router = express.Router();

import { registerUser, logIn } from "../controllers/auth";
import validationMiddleware from "../middlewares/validation";
import {
  validateCreateUserSchema,
  validateLoginSchema,
} from "../validations/auth";

router.post(
  "/register",
  validationMiddleware(validateCreateUserSchema),
  registerUser
);
router.post("/login", validationMiddleware(validateLoginSchema), logIn);

export default router;
