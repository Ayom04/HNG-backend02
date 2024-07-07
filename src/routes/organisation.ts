import express from "express";
const router = express.Router();

import authentication from "../middlewares/authentication";
import Authorization from "../middlewares/authorization";
import validationMiddleware from "../middlewares/validation";
import {createOrganisation,getAnOrganisation, getUserOrganisation,addUserToAnOrganisation} from "../controllers/organisation"

router.get('',Authorization, authentication,getUserOrganisation)
router.post('',Authorization, authentication, createOrganisation)
router.get('/:orgId',Authorization, authentication,getAnOrganisation )
router.get('/:orgId/users',Authorization, authentication,addUserToAnOrganisation )

export default router;
