import { MongoLib } from '../lib/mongo'

export class MoviesService {
  private readonly collection: string
  private readonly mongoDB

  constructor () {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies ({ tags }: { tags: string[] }): Promise<string | null> {
    // const query = tags && { tags: { $in: tags } }
    const query = tags
    const movies = await this.mongoDB.getAll(this.collection, query)
    console.log(movies)
    return movies
  }

  // async getMovies ({ tags }) {
  //   const query = tags && { tags: { $in: tags } }
  //   const movies = await this.mongoDB.getAll(this.collection, query)
  //   return movies || []
  // }

  // async getMovie ({ movieId }) {
  //   const movie = await this.mongoDB.get(this.collection, movieId)
  //   return movie || {}
  // }

  // async createMovie ({ movie }) {
  //   const createMovieId = await this.mongoDB.create(this.collection, movie)
  //   return createMovieId
  // }

  // async updateMovie ({ movieId, movie } = {}) {
  //   const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie)
  //   return updatedMovieId
  // }

  // async deleteMovie ({ movieId }) {
  //   const deletedMovieId = await this.mongoDB.delete(this.collection, movieId)
  //   return deletedMovieId
  // }

  // async patchMovie ({ movieId, movie }) {
  //   const patchMovieId = await this.mongoDB.update(this.collection, movieId, movie)
  //   return patchMovieId
  // }
}

const test = new MoviesService()

const result = test.getMovies({ tags: [] })
console.log(result)
