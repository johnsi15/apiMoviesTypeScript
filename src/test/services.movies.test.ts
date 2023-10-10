/* eslint-disable @typescript-eslint/no-misused-promises */
// const proxyquire = require('proxyquire')

import { MongoLibMock, getAllStub } from '../utils/mocks/mongoLib'

import { createRandomMovies } from '../utils/mocks/movies'
import { MoviesService } from '../services/movies'

jest.mock('../lib/mongo', () => {
  return {
    MongoLib: MongoLibMock
  }
})

describe('services - movies', function () {
  let moviesService: MoviesService
  beforeEach(() => {
    moviesService = new MoviesService()
    jest.clearAllMocks()
  })

  describe('when getMovies method is called', function () {
    test('list movies', async () => {
      const fakeMovies = createRandomMovies(20)
      getAllStub.mockResolvedValue(fakeMovies)
      const books = await moviesService.getMovies({ tags: [''] })

      // console.log(books);
      expect(books).toBeTruthy()
      expect(books.length).toEqual(fakeMovies.length)
      expect(getAllStub).toHaveBeenCalled()
      expect(getAllStub).toHaveBeenCalledTimes(1)
      expect(getAllStub).toHaveBeenCalledWith('books', {})
    })
    // test('should call the getall MongoLib method', async function () {
    //   await moviesService.getMovies({})
    //   assert.strictEqual(getAllStub.called, true)
    // })

    // test('should return an array of movies', async function () {
    //   const result = await moviesService.getMovies({})
    //   const expected = fakeMovies
    //   assert.deepEqual(result, expected)
    // })
  })
})
