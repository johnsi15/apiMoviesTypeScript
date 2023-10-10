import { faker } from '@faker-js/faker'
import { type Movie } from '../../types'

export interface MovieMock extends Movie {
  id: string
}

export const createOneMovie = (): MovieMock => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.words(3),
    year: faker.number.int({ max: 2024, min: 1888 }),
    cover: faker.image.urlPicsumPhotos(),
    description: faker.lorem.paragraph(),
    duration: faker.number.int({ min: 1, max: 300 }),
    contentRating: faker.string.numeric({ length: 1, exclude: ['0', '6', '7', '8', '9'] }),
    source: faker.internet.url(),
    tags: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word()
    ]
  }
}

export const createRandomMovies = (size: number): MovieMock[] => {
  const limit = size ?? 10
  const movies = []
  for (let index = 0; index < limit; index++) {
    movies.push(createOneMovie())
  }

  return movies
}

export const fakeMovies: MovieMock[] = createRandomMovies(10)

export function filteredMoviesMock (tag: { tags: string[] } | string): Movie[] {
  // { tags: ['Drama'] }
  if (typeof tag === 'string') {
    return fakeMovies.filter(movie => movie.tags?.includes(tag))
  } else if (Array.isArray(tag.tags)) {
    return fakeMovies.filter(movie => movie.tags?.some(movieTag => tag.tags.includes(movieTag)))
  }

  return []
}

export class MoviesServiceMock {
  async getMovies (): Promise<MovieMock[]> {
    return await Promise.resolve(fakeMovies)
  }

  async getMovie (): Promise<MovieMock> {
    return await Promise.resolve(fakeMovies[0])
  }

  async createMovie (): Promise<MovieMock> {
    return await Promise.resolve(fakeMovies[0])
  }
}
