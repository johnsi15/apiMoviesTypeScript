import Joi from 'joi'
import { type UserPartial } from '../types'

export const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const userSchema = {
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
}

export const createUserSchema: UserPartial = {
  ...userSchema,
  isAdmin: Joi.boolean()
}

export const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: Joi.string().required()
}
