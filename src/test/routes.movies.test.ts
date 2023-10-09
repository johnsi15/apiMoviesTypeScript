import { type Express } from 'express'
import { moviesMock, MoviesServiceMock } from '../utils/mocks/movies'
import { moviesApi } from '../routes/movies'
import { testServer } from '../utils/testServer'

jest.mock('../services/movies', () => {
  return { MoviesService: MoviesServiceMock }
})
describe('routes - movies', function () {
  // const route = proxyquire('../routes/movies.ts', {
  //   '../services/movies.ts': MoviesServiceMock
  // })
  // const request = testServer(route)
  // const request = testServer(moviesApi)
  let request: ReturnType<typeof testServer>

  beforeAll(() => {
    // Crea una instancia de testServer y configura las rutas en ella
    request = testServer((app: Express) => {
      moviesApi(app)
    })
  })

  describe('GET /movies', function () {
    // test('should respond with status 200', async function () {
    //   await request.get('/api/movies').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE1YjMzNTBiMmNmZGJmZTE2YTU4M2UiLCJuYW1lIjoiUk9PVCIsImVtYWlsIjoicm9vdEBqb2huc2VycmFuby5jbyIsInNjb3BlcyI6WyJzaWduaW46YXV0aCIsInNpZ251cDphdXRoIiwicmVhZDptb3ZpZXMiLCJjcmVhdGU6bW92aWVzIiwidXBkYXRlOm1vdmllcyIsImRlbGV0ZTptb3ZpZXMiLCJyZWFkOnVzZXItbW92aWVzIiwiY3JlYXRlOnVzZXItbW92aWVzIiwiZGVsZXRlOnVzZXItbW92aWVzIl0sImlhdCI6MTY5Njg5MzYwMiwiZXhwIjoxNjk2ODk0NTAyfQ.H8CDIl-nFjrUBCEZrTEnP_cyN7pzXSwfMTyFcu2Ntv4').expect(200)
    // })

    test('should respond with the list of movies', async function () {
      try {
        const response = await request.get('/api/movies').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE1YjMzNTBiMmNmZGJmZTE2YTU4M2UiLCJuYW1lIjoiUk9PVCIsImVtYWlsIjoicm9vdEBqb2huc2VycmFuby5jbyIsInNjb3BlcyI6WyJzaWduaW46YXV0aCIsInNpZ251cDphdXRoIiwicmVhZDptb3ZpZXMiLCJjcmVhdGU6bW92aWVzIiwidXBkYXRlOm1vdmllcyIsImRlbGV0ZTptb3ZpZXMiLCJyZWFkOnVzZXItbW92aWVzIiwiY3JlYXRlOnVzZXItbW92aWVzIiwiZGVsZXRlOnVzZXItbW92aWVzIl0sImlhdCI6MTY5Njg5MzYwMiwiZXhwIjoxNjk2ODk0NTAyfQ.H8CDIl-nFjrUBCEZrTEnP_cyN7pzXSwfMTyFcu2Ntv4')
        console.log({ body: response.body })
        console.log({ moviesMock })
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
