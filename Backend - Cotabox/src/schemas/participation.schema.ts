import Joi from "joi";

export const participationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  participation: Joi.number().precision(2).required(),
});
