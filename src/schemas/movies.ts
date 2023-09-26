import Joi from 'joi'
import { type MoviePartial } from '../types'

// const createSchema = (schema: MoviePartial): MoviePartial => {
//   return Joi.object().keys(schema)
// }

const commonRules = {
  title: Joi.string().max(80),
  year: Joi.number().min(1888).max(2077),
  cover: Joi.string().uri(),
  description: Joi.string().max(300),
  duration: Joi.number().min(1).max(300),
  contentRating: Joi.string().max(5),
  source: Joi.string().uri(),
  tags: Joi.array().items(Joi.string().max(50))
}

export const movieIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

export const createMovieSchema: MoviePartial = {
  ...commonRules,
  title: commonRules.title.required(),
  year: commonRules.year.required(),
  cover: commonRules.cover.required(),
  description: commonRules.description.required(),
  duration: commonRules.duration.required(),
  contentRating: commonRules.contentRating.required(),
  source: commonRules.source.required(),
  tags: commonRules.tags
}

export const updateMovieSchema: MoviePartial = {
  ...commonRules
}
