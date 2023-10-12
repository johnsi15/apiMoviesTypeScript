import { type Express } from 'express'
import { MongoLibMock, getAllStub } from '../../utils/mocks/mongoLib'
import { testServer } from '../../utils/testServer'
import { createAuthToken } from '../../utils/authToken'
import { createRandomMovies } from '../../utils/mocks/movies'
import { moviesApi } from '../../routes/movies'

// import { createOneMovie, createRandomMovies, filteredMoviesMock } from '../utils/mocks/movies'
// import { MoviesService } from '../services/movies'

jest.mock('../../lib/mongo', () => {
  return {
    MongoLib: MongoLibMock
  }
})

describe('routes and services movies intregation e2e', () => {
  let request: ReturnType<typeof testServer>
  let headers = {}

  beforeAll(async () => {
    const authToken = createAuthToken()

    request = testServer((app: Express) => {
      moviesApi(app)
    })

    headers = {
      Authorization: `Bearer ${authToken}`,
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /movies', () => {
    test('should respond with status 200', async () => {
      const fakeMovies = createRandomMovies(10)
      getAllStub.mockResolvedValue(fakeMovies)

      await request.get('/api/movies').set(headers).expect(200)
    })

    test('should respond with the list of movies', async () => {
      const fakeMovies = createRandomMovies(5)
      getAllStub.mockResolvedValue(fakeMovies)

      try {
        const { body, statusCode } = await request.get('/api/movies').set(headers)

        expect(statusCode).toBe(200)
        expect(body.data.length).toEqual(fakeMovies.length)
        expect(body).toEqual({
          data: fakeMovies,
          message: 'movies listed'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })
  })
})
