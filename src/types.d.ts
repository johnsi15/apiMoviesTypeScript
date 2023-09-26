export interface Movie {
  title: string
  year: number
  cover: string
  description: string
  duration: number
  contentRating: string
  source: string
  tags?: string[]
}

export type MoviePartial = Joi.PartialSchemaMap<Movie>
