import { type MovieMock } from './movies'

export const getAllStub = jest.fn()
export const getByIdStub = jest.fn()
export const createStub = jest.fn()

getAllStub.mockImplementation(() => ({ getAll: getAllStub }))
getByIdStub.mockImplementation(() => ({ getById: getByIdStub }))
createStub.mockImplementation(() => ({ create: createStub }))

export class MongoLibMock {
  getAll (collection: string, query: string | string[]): void {
    return getAllStub(collection, query)
  }

  getById (collection: string, id: string): void {
    return getByIdStub(collection, id)
  }

  create (collection: string, data: MovieMock): void {
    return createStub(collection, data)
  }
}
