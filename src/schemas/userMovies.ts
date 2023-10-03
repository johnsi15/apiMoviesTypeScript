import Joi from 'joi'

import { movieId } from './movies'
import { userId } from './users'

export const userMovieId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
export const userMovieIdSchema = Joi.object({ userMovieId })

export const createUserMovieSchema = Joi.object({
  userId: userId.required(),
  movieId: movieId.required()
})
