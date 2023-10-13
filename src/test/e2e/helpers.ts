import { type Express } from 'express'
import { testServer } from '../../utils/testServer'
import { moviesApi } from '../../routes/movies'
import { type Movie } from '../../types'

const request = testServer((app: Express) => {
  moviesApi(app)
})

interface Headers {
  Authorization: string
  Accept: string
  'X-Requested-With': string
  'Content-Type': string
}

export const getAllMovies = async ({ headers }: { headers: Headers }): Promise<{ movies: Movie }> => {
  const response = await request.get('/api/movies').set(headers)
  return {
    movies: response.body.data
  }
}
