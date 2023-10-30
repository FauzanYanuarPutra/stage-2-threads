
const Joi = require('joi');

export const CreateThreadDTO = Joi.object({
  content: Joi.string().min(8).required(),
  image: Joi.string().min(8).required()
})

export const UpdateThreadDTO = Joi.object({
  content: Joi.string().min(8),
  image: Joi.string().min(8)
})