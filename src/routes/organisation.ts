import express from "express";
const router = express.Router();
import {
  validateCreateOrganisationSchema,
  validateAddUserToOrganisationSchema,
} from "../validations/organisation";
import authentication from "../middlewares/authentication";
import Authorization from "../middlewares/authorization";
import validationMiddleware from "../middlewares/validation";
import {
  createOrganisation,
  getAnOrganisation,
  getUserOrganisation,
  addUserToAnOrganisation,
} from "../controllers/organisation";

router.get("", Authorization, authentication, getUserOrganisation);
router.post(
  "",
  Authorization,
  authentication,
  validationMiddleware(validateCreateOrganisationSchema),
  createOrganisation
);
router.get("/:orgId", Authorization, authentication, getAnOrganisation);
router.get(
  "/:orgId/users",
  Authorization,
  authentication,
  validationMiddleware(validateAddUserToOrganisationSchema),
  addUserToAnOrganisation
);

export default router;
