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
    // Crea una instancia de testServer y configura las rutas en ella
    request = testServer((app: Express) => {
      moviesApi(app)
    })
    const authToken = createAuthToken()
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
  })
})
