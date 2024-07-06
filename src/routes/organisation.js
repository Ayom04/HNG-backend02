import express from "express";
const router = express.Router();

import authentication from "../middlewares/authentication";
import Authorization from "../middlewares/authorization";
import validationMiddleware from "../middlewares/validation";

router.get('',Authorization, authentication)
router.post('')

export default router;
