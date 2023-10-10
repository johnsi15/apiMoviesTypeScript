import { type Express } from 'express'
import { moviesMock, MoviesServiceMock } from '../utils/mocks/movies'
import { UsersServiceMock } from '../utils/mocks/users'
import { moviesApi } from '../routes/movies'
import { testServer } from '../utils/testServer'
import { createAuthToken } from '../utils/authToken'

jest.mock('../services/movies', () => {
  return { MoviesService: MoviesServiceMock }
})

jest.mock('../services/users', () => {
  return { UsersService: UsersServiceMock }
})

describe('routes - movies', function () {
  let request: ReturnType<typeof testServer>
  let headers = {}

  beforeAll(async () => {
    const authToken = createAuthToken()

    request = testServer((app: Express) => {
      moviesApi(app)
    })

    headers = {
      Authorization: `Bearer ${authToken}`,
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  describe('GET /movies', function () {
    test('should respond with status 200', async function () {
      await request.get('/api/movies').set(headers).expect(200)
    })

    test('should respond with the list of movies', async function () {
      try {
        const response = await request.get('/api/movies').set(headers)

        expect(response.body).toEqual({
          data: moviesMock,
          message: 'movies listed'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with a recovered movie', async function () {
      try {
        const { id } = moviesMock[0]
        const response = await request.get(`/api/movies/${id}`).set(headers)

        expect(response.body).toEqual({
          data: moviesMock[0],
          message: 'movie retrieved'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with the list of movies by tags', async function () {
      try {
        const [tag1, tag2] = moviesMock[0].tags ?? []
        const response = await request.get(`/api/movies?tags=${tag1}&tags=${tag2}&tags=drama`).set(headers)

        expect(response.body).toEqual({
          data: moviesMock,
          message: 'movies listed'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })
  })
})
