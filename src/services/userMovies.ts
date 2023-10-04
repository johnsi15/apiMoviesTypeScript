import type { WithId, Document, ObjectId } from 'mongodb'
import { MongoLib } from '../lib/mongo'

export class UserMoviesService {
  private readonly collection: string
  private readonly mongoDB

  constructor () {
    this.collection = 'user-movies'
    this.mongoDB = new MongoLib()
  }

  async getUserMovies ({ userId }: { userId: string }): Promise<Array<WithId<Document>>> {
    let query = {}
    // const query = userId != null && { userId }
    if (userId != null) {
      query = { userId }
    }

    const userMovies = await this.mongoDB.getAll(this.collection, query)

    return userMovies ?? []
  }

  async createUserMovie ({ userMovie }: { userMovie: Document }): Promise<ObjectId | undefined> {
    const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie)

    return createdUserMovieId
  }

  async deleteUserMovie ({ userMovieId }: { userMovieId: string }): Promise<string> {
    const deletedUserMovieId = await this.mongoDB.delete(this.collection, userMovieId)

    return deletedUserMovieId
  }
}
