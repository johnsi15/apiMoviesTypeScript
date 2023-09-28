import { type StringSchema, type BooleanSchema } from 'joi'

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

export interface User {
  name: string
  email: string
  password: string | Buffer
}

export interface UserPartial extends User {
  _id?: string | undefined | StringSchema
  isAdmin?: boolean | undefined | BooleanSchema
}

export interface Query {
  tags?: string | null
  email?: string
  token?: string
}
