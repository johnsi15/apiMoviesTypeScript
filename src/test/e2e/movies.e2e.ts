import { type Db, MongoClient, ServerApiVersion } from 'mongodb'
import { type Express } from 'express'
import { testServer } from '../../utils/testServer'
import { createAuthToken } from '../../utils/authToken'
import { createOneMovie } from '../../utils/mocks/movies'
import { moviesApi } from '../../routes/movies'
import { getAllMovies, initialMovies } from './helpers'
import { config } from '../../config'
import { type Movie } from '../../types'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbNameTest

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/?retryWrites=true&w=majority`

describe('routes and services movies intregation e2e', () => {
  let request: ReturnType<typeof testServer>
  let headers: {
    Authorization: string
    Accept: string
    'X-Requested-With': string
    'Content-Type': string
  }
  let database: Db
  let seedMovies: {
    insertedCount: number
  }
  let client: MongoClient
  let fakeMovies: Movie[]

  const collectionMovies = 'movies'
  const collectionUsers = 'users'
  const user = {
    name: 'Andrey provider',
    email: 'japrovider@gmail.com',
    password: 'secret'
  }

  beforeAll(async () => {
    const authToken = createAuthToken({ user })

    request = testServer((app: Express) => {
      moviesApi(app)
    })

    headers = {
      Authorization: `Bearer ${authToken}`,
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }

    client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    await client.connect()
    database = client.db(DB_NAME)
  })

  beforeEach(async () => {
    // jest.clearAllMocks()
    await database.collection(collectionUsers).insertOne(user)

    fakeMovies = initialMovies()
    seedMovies = await database.collection(collectionMovies).insertMany(fakeMovies)
  })

  afterEach(async () => {
    // await database.collection(collectionMovies).drop()
    // await database.collection(collectionUsers).drop()
    await database.dropDatabase()
  })

  afterAll(async () => {
    try {
      await client.close()
      console.log('Conexión cerrada correctamente')
    } catch (err) {
      console.error('Error al cerrar la conexión:', err)
    }
  })

  describe('GET /movies', () => {
    test('should respond with status 200', async () => {
      await request.get('/api/movies').set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('should respond with the list of movies', async () => {
      try {
        const { body, statusCode } = await request.get('/api/movies').set(headers)
        const { data, message } = body

        expect(statusCode).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data).toHaveLength(seedMovies.insertedCount)
        expect(message).toBe('movies listed')
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with a recovered movie', async () => {
      const movies = await getAllMovies({ headers })
      const movieId = movies[0]._id?.toString()

      try {
        const { body, statusCode } = await request.get(`/api/movies/${movieId}`).set(headers)

        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('data')
        expect(body).toHaveProperty('message')
        expect(body.message).toBe('movie retrieved')
        expect(body).toEqual({
          data: movies[0],
          message: 'movie retrieved'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with the list of movies by tags', async () => {
      const TAGS = ['Drama', 'Acción', 'Misterio']
      const movies = await getAllMovies({ headers, tags: TAGS })

      try {
        const { body, statusCode } = await request.get(`/api/movies?tags=${TAGS[0]}&tags=${TAGS[1]}&tags=${TAGS[2]}`).set(headers)

        expect(statusCode).toBe(200)
        expect(body.data).toHaveLength(movies.length)
        expect(body).toEqual({
          data: movies,
          message: 'movies listed'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond with a newly created movie POST', async () => {
      const fakeMovie = createOneMovie()
      const { id, ...data } = fakeMovie

      try {
        const { body, statusCode } = await request.post('/api/movies').set(headers).send(data)

        const movies = await getAllMovies({ headers })

        expect(statusCode).toBe(201)
        expect(body).toHaveProperty('data')
        expect(body).toHaveProperty('message')
        expect(body.message).toBe('movie created')
        // expect(body.data).toBe(fakeMovieId)
        expect(movies).toHaveLength(fakeMovies.length + 1)
        expect(body).toEqual({
          data: body.data,
          message: 'movie created'
        })
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })

    test('should respond 401 Unauthorized', async () => {
      const headers = {
        Authorization: 'Bearer xxxx',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }

      try {
        const { statusCode } = await request.get('/api/movies').set(headers)

        expect(statusCode).toBe(401)
      } catch (err) {
        console.log(':( algo salió mal!', err)
        throw err
      }
    })
  })
})
