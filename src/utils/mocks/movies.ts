import { faker } from '@faker-js/faker'
import { type Movie } from '../../types'

const createRandomMovies = (count: number): Movie[] => {
  const movies = []
  for (let index = 0; index < count; index++) {
    // const element = array[index];
    movies.push({
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
    })
  }

  return movies
}

export const moviesMock: Movie[] = createRandomMovies(10)

export function filteredMoviesMock (tag: { tags: string[] } | string): Movie[] {
  // { tags: ['Drama'] }
  if (typeof tag === 'string') {
    return moviesMock.filter(movie => movie.tags.includes(tag))
  } else if (Array.isArray(tag.tags)) {
    return moviesMock.filter(movie => movie.tags.some(movieTag => tag.tags.includes(movieTag)))
  }

  return []
}

export class MoviesServiceMock {
  async getMovies (): Promise<Movie[]> {
    return await Promise.resolve(moviesMock)
  }

  async createMovie (): Promise<Movie> {
    return await Promise.resolve(moviesMock[0])
  }
}
