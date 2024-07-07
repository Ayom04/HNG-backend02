import express from "express";
const router = express.Router();

import authentication from "../middlewares/authentication";
import Authorization from "../middlewares/authorization";
import validationMiddleware from "../middlewares/validation";
import {createOrganisation,getAnOrganisation, getUserOrganisation} from "../controllers/organisation"

router.get('',Authorization, authentication,getUserOrganisation)
router.post('',Authorization, authentication, createOrganisation)
router.get('/:orgId',Authorization, authentication,getAnOrganisation )

export default router;
