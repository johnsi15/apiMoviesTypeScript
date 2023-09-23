import sinon from 'sinon'

import { moviesMock, filteredMoviesMock } from './movies'

export const getAllStub = sinon.stub()
getAllStub.withArgs('movies').resolves(moviesMock)

const tagQuery = { tags: { $in: ['Drama'] } }
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'))

export const createStub = sinon.stub().resolves(moviesMock[0].id)

export class MongoLibMock {
  getAll (collection: string, query) {
    return getAllStub(collection, query)
  }

  create (collection: string, data) {
    return createStub(collection, data)
  }
}
