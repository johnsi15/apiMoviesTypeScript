import { type Express } from 'express'
import { testServer } from '../../utils/testServer'
import { moviesApi } from '../../routes/movies'
import { type Movie } from '../../types'
import { createRandomMovies } from '../../utils/mocks/movies'

const request = testServer((app: Express) => {
  moviesApi(app)
})

interface Headers {
  Authorization: string
  Accept: string
  'X-Requested-With': string
  'Content-Type': string
}

export const initialMovies = (): Movie[] => {
  const fakeMovies = createRandomMovies(10)
  return fakeMovies
}

export const getAllMovies = async ({ headers, tags }: { headers: Headers, tags?: string[] }): Promise<Movie[]> => {
  if (tags != null && tags.length > 0) {
    const query = `?tags=${tags[0]}&tags=${tags[1]}&tags=${tags[2]}`
    const response = await request.get(`/api/movies${query}`).set(headers)
    return response.body.data
  }

  const response = await request.get('/api/movies').set(headers)
  return response.body.data
}
