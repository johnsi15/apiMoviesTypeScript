/* eslint-disable @typescript-eslint/no-misused-promises */
// const proxyquire = require('proxyquire')

// import { MongoLibMock, getAllStub } from '../utils/mocks/mongoLib'

import { createRandomMovies } from '../utils/mocks/movies'
import { MoviesService } from '../services/movies'

// jest.mock('../lib/mongo', () => {
//   return {
//     MongoLib: MongoLibMock
//   }
// })

const mockGetAll = jest.fn() // mock or spy

jest.mock('../lib/mongo', () => {
  return {
    MongoLib: jest.fn().mockImplementation(() => ({
      getAll: mockGetAll,
      create: () => {}
    }))
  }
})

describe('services - movies', function () {
  let moviesService: MoviesService
  beforeEach(() => {
    moviesService = new MoviesService()
    // jest.clearAllMocks()
    // mockGetAll.mockClear()
    mockGetAll.mockReset()
  })

  describe('when getMovies method is called', function () {
    test('should call the getall MongoLib method', async () => {
      await moviesService.getMovies({ tags: '' })
      expect(mockGetAll).toHaveBeenCalled()
      expect(mockGetAll).toHaveBeenCalledTimes(1)
    })

    test('should return an array of movies', async function () {
      const fakeMovies = createRandomMovies(20)
      mockGetAll.mockResolvedValue(fakeMovies)
      const movies = await moviesService.getMovies({ tags: '' })

      const expectedQuery = {
        tags: { $elemMatch: { $options: 'i', $regex: '' } }
      }

      expect(movies).toBeTruthy()
      expect(movies.length).toEqual(fakeMovies.length)
      expect(movies).toEqual(fakeMovies)
      expect(mockGetAll).toHaveBeenCalledWith('movies', expectedQuery)
    })

    test('should return an empty array if no movies are found', async function () {
      const movies = await moviesService.getMovies({ tags: 'Drama' })
      const expectedQuery = {
        tags: { $elemMatch: { $options: 'i', $regex: 'Drama' } }
      }

      expect(movies).toBeTruthy()
      expect(movies.length).toEqual(0)
      expect(movies).toEqual([])
      expect(mockGetAll).toHaveBeenCalledWith('movies', expectedQuery)
    })
  })
})
