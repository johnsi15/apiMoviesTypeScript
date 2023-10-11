/* eslint-disable @typescript-eslint/no-misused-promises */
// const proxyquire = require('proxyquire')

import { MongoLibMock, getAllStub, createStub } from '../utils/mocks/mongoLib'

import { createOneMovie, createRandomMovies, filteredMoviesMock } from '../utils/mocks/movies'
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
    jest.resetAllMocks()
  })

  describe('when getMovies method is called', function () {
    test('should call the getall MongoLib method', async () => {
      await moviesService.getMovies({ tags: '' })
      expect(getAllStub).toHaveBeenCalled()
      expect(getAllStub).toHaveBeenCalledTimes(1)
    })

    test('should return an array of movies', async () => {
      const fakeMovies = createRandomMovies(20)
      getAllStub.mockResolvedValue(fakeMovies)
      const movies = await moviesService.getMovies({ tags: '' })

      const expectedQuery = {
        tags: { $elemMatch: { $options: 'i', $regex: '' } }
      }

      expect(movies).toBeTruthy()
      expect(movies.length).toEqual(fakeMovies.length)
      expect(movies).toEqual(fakeMovies)
      expect(getAllStub).toHaveBeenCalledWith('movies', expectedQuery)
    })

    test('should return an empty array if no movies are found', async () => {
      const fakeMovies = filteredMoviesMock({ tags: ['tagnofound'] })
      getAllStub.mockResolvedValue(fakeMovies)

      const movies = await moviesService.getMovies({ tags: 'tagnofound' })
      const expectedQuery = {
        tags: { $elemMatch: { $options: 'i', $regex: 'tagnofound' } }
      }

      expect(movies).toBeTruthy()
      expect(movies.length).toEqual(0)
      expect(movies).toEqual([])
      expect(getAllStub).toHaveBeenCalledWith('movies', expectedQuery)
    })

    test('should return an array of movies filter by tags', async () => {
      const TAGS = ['Drama', 'Acción', 'Misterio']

      const fakeMovies = filteredMoviesMock({ tags: TAGS })
      getAllStub.mockResolvedValue(fakeMovies)

      const movies = await moviesService.getMovies({ tags: TAGS })
      const expectedQuery = {
        tags: { $in: [/Drama/i, /Acción/i, /Misterio/i] }
      }

      expect(movies).toBeTruthy()
      expect(movies).toEqual(fakeMovies)
      expect(movies.length).toEqual(fakeMovies.length)
      fakeMovies[0].tags?.forEach((tag) => {
        expect(movies.some((movie) => movie.tags.includes(tag))).toBeTruthy()
      })
      expect(getAllStub).toHaveBeenCalledWith('movies', expectedQuery)
    })

    test('should return an new movie', async () => {
      const fakeMovie = createOneMovie()
      createStub.mockResolvedValue(fakeMovie)

      const movie = await moviesService.createMovie({ movie: fakeMovie })

      expect(movie).toBeTruthy()
      expect(movie).toEqual(fakeMovie)
      expect(movie?.id).toBeDefined()
    })
  })
})
