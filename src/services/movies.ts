import type { WithId, Document, ObjectId } from 'mongodb'
import { MongoLib } from '../lib/mongo'

export class MoviesService {
  private readonly collection: string
  private readonly mongoDB

  constructor () {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies ({ tags }: { tags: string[] | string }): Promise<Array<WithId<Document>> | []> {
    // const query = tags && { tags: { $in: tags } }
    // console.log(tags)
    let query = {}

    if (Array.isArray(tags)) {
      query = { tags: { $in: tags } }
    } else if (typeof tags === 'string') {
      query = { tags }
    }

    const movies = await this.mongoDB.getAll(this.collection, query)
    // console.log({ movies })

    return movies ?? []
  }

  async getMovie ({ movieId }: { movieId: string }): Promise<WithId<Document> | null> {
    const movie = await this.mongoDB.getById(this.collection, movieId)
    return movie ?? null
  }

  async createMovie ({ movie }: { movie: Document }): Promise<ObjectId | undefined> {
    const createMovieId = await this.mongoDB.create(this.collection, movie)
    return createMovieId
  }

  async updateMovie ({ movieId, movie }: { movieId: string, movie: Document | string } = { movieId: '', movie: '' }): Promise<string | ObjectId> {
    // validate si pasan un moviId vacio y un movie ??¿¿
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie)
    return updatedMovieId
  }

  async deleteMovie ({ movieId }: { movieId: string }): Promise<string> {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId)
    return deletedMovieId
  }

  async patchMovie ({ movieId, movie }: { movieId: string, movie: Document | string } = { movieId: '', movie: '' }): Promise<string | ObjectId> {
    const patchMovieId = await this.mongoDB.update(this.collection, movieId, movie)
    return patchMovieId
  }
}
