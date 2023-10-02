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

export interface User {
  _id?: string | undefined
  name: string
  email: string
  password: string | Buffer
  isAdmin?: boolean | undefined
  apiKeyToken?: string | undefined
  scopes?: string[] | null
}

export interface Query {
  tags?: string | null
  email?: string
  token?: string
}

export type ValidationData = Partial<User & Movie>

declare global {
  namespace Express {
    interface User {
      scopes?: string[] | null
    }
  }
}
