import Joi from 'joi'

import { movieIdSchema } from './movies'
import { userIdSchema } from './users'

export const userMovieIdSchema = Joi.object({ userMovieId: Joi.string().regex(/^[0-9a-fA-F]{24}$/) })

export const createUserMovieSchema = Joi.object({
  userId: userIdSchema,
  movieId: movieIdSchema
})
