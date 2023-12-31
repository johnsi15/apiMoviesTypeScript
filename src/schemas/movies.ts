import Joi from 'joi'

const commonRules = {
  title: Joi.string().max(80),
  year: Joi.number().integer().min(1888).max(2077),
  cover: Joi.string().uri(),
  description: Joi.string().max(300),
  duration: Joi.number().integer().min(1).max(300),
  contentRating: Joi.string().default('1').max(5),
  source: Joi.string().uri(),
  tags: Joi.array().items(Joi.string().max(50))
  // tags: Joi.array().items(Joi.string().valid('Terror', 'Drama', 'Acción', 'Aventura', 'Comedia', 'Romance', 'Misterio'))
}

export const movieId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
export const movieIdSchema = Joi.object({ movieId })

export const createMovieSchema = Joi.object({
  // ...commonRules,
  title: commonRules.title.required(),
  year: commonRules.year.required(),
  cover: commonRules.cover.required(),
  description: commonRules.description.required(),
  duration: commonRules.duration.required(),
  contentRating: commonRules.contentRating,
  source: commonRules.source.required(),
  tags: commonRules.tags
})

export const updateMovieSchema = Joi.object({
  ...commonRules,
  contentRating: Joi.string().max(5) // porque necesitamos evitar el default('1')
})
