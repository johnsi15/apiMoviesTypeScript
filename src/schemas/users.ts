import Joi from 'joi'

export const userId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
export const userIdSchema = Joi.object({ userId: userId.required() })

const userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const createUserSchema = userSchema.keys({
  isAdmin: Joi.boolean()
})

export const createProviderUserSchema = userSchema.keys({
  apiKeyToken: Joi.string().required()
})
