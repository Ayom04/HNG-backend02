import Joi from 'joi'

const validateCreateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": `"Email" cannot be an empty`,
      "any.required": `"Email" is a required field`,
    }),
    phone: Joi.string(),
    password: Joi.string()
    .min(8)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
    .required()
    .label('Password')
    .messages({
      'string.min': `{{#label}} should have a minimum length of {#limit}`,
      'any.required': `{{#label}} is a required field`,
      'object.regex': `Must have at least 8 characters`,
      'string.pattern.base': `{{#label}} must contain at least a number, letter and special characters`,
    }), 
})

const validateLoginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "string.empty": `"Email" cannot be an empty`,
        "any.required": `"Email" is a required field`,
      }),
    password: Joi.string().required().messages({
      "string.empty": `"Password" cannot be empty`,
      "any.required": `"Password" is a required field`,
    }),
})
export {
    validateCreateUserSchema,validateLoginSchema
}