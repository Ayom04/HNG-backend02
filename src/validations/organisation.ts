import Joi from "joi";

const validateCreateOrganisationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const validateAddUserToOrganisationSchema = Joi.object({
  userId: Joi.string().required(),
});

export {
  validateCreateOrganisationSchema,
  validateAddUserToOrganisationSchema,
};
