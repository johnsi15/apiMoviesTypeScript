import { type Express } from 'express'
import { fakeMovies, MoviesServiceMock } from '../utils/mocks/movies'
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
    const authToken = createAuthToken({})

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

  describe('GET /movies', function () {
    test('should respond with status 200', async () => {
      await request.get('/api/movies').set(headers).expect(200)
    })

    test('should respond with the list of movies', async () => {
      try {
        const response = await request.get('/api/movies').set(headers)

        expect(response.body).toEqual({
          data: fakeMovies,
          message: 'movies listed'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with a recovered movie', async () => {
      try {
        const { id } = fakeMovies[0]
        const response = await request.get(`/api/movies/${id}`).set(headers)

        expect(response.body).toEqual({
          data: fakeMovies[0],
          message: 'movie retrieved'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with the list of movies by tags', async () => {
      try {
        const [tag1, tag2] = fakeMovies[0].tags ?? []
        const response = await request.get(`/api/movies?tags=${tag1}&tags=${tag2}&tags=drama`).set(headers)

        expect(response.body).toEqual({
          data: fakeMovies,
          message: 'movies listed'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with new movie POST', async () => {
      try {
        const response = await request.post('/api/movies').set(headers).expect(201)
        expect(response.body).toEqual({
          data: fakeMovies[0],
          message: 'movie created'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('movie route no fount should respond with status code 404', async () => {
      try {
        await request.post('/api/movies/create').set(headers).expect(404)
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })
  })
})
