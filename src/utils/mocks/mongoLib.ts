import { fakeMovies, filteredMoviesMock } from './movies'
import { type Movie } from '../../types'

export const getAllStub = jest.fn()

getAllStub.mockImplementation(async (collection: string, query: string[]) => {
  if (collection === 'movies' && query.some(q => q === 'Drama')) {
    return await Promise.resolve(filteredMoviesMock('Drama'))
  } else if (collection === 'movies') {
    return await Promise.resolve(fakeMovies)
  }

  return await Promise.resolve([])
})

export const createStub = jest.fn()

createStub.mockImplementation(async (_collection: string, data: Movie) => {
  // return await Promise.resolve(fakeMovies[0].id)
  return await Promise.resolve(data)
})

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MongoLibMock {
  static getAll = getAllStub
  static create = createStub

  static reset (): void {
    this.getAll.mockReset()
    this.create.mockReset()
  }
}
