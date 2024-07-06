import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/user";
import validationMiddleware from '../middlewares/validation'
import { validateCreateUserSchema } from "../validations/user";
router.post('/register',validationMiddleware(validateCreateUserSchema), registerUser)
router.post('/login')
export default router