// import { fakeMovies } from './movies'
import { type Movie } from '../../types'

export const getAllStub = jest.fn()
export const createStub = jest.fn()

getAllStub.mockImplementation(() => ({ getAll: getAllStub }))
createStub.mockImplementation(() => ({ create: createStub }))

export class MongoLibMock {
  getAll (collection: string, query: string | string[]): void {
    return getAllStub(collection, query)
  }

  create (collection: string, data: Movie): void {
    return createStub(collection, data)
  }
}
