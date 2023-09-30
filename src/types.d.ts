import type Joi from 'joi'

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
  _id?: string | undefined
  name: string
  email: string
  password: string | Buffer
  isAdmin?: boolean | undefined
  apiKeyToken?: string | undefined
}

export type UserPartial = Joi.PartialSchemaMap<User>

export interface Query {
  tags?: string | null
  email?: string
  token?: string
}

export type ValidationData = Partial<User & Movie>
