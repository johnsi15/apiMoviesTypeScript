import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import type { Db, WithId, Document } from 'mongodb'
import { type Query } from '../types'
import { config } from '../config/index'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/?retryWrites=true&w=majority`

export class MongoLib {
  private readonly client: MongoClient
  private readonly dbName: string | undefined
  private static connection: Db | Error | null = null

  constructor () { // puede ser interesante convertirala en singleton
    this.client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.dbName = DB_NAME
  }

  private async connect (): Promise<Db | Error | null> {
    if (MongoLib.connection == null) {
      try {
        await this.client.connect()

        console.log('Connected succesfully to mongodb')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (error) {
        console.error('Error connecting to the database')
        console.error(error)
        await this.client.close()
      }
    }

    return MongoLib.connection
  }

  async getAll (collection: string, query: Query): Promise<Array<WithId<Document>> | null> {
    return await this.connect().then(async db => {
      if (db instanceof Error || db == null) {
        return null
      }

      return await db.collection(collection).find(query).toArray()
    })
  }

  async getById (collection: string, id: string): Promise<WithId<Document> | null> {
    return await this.connect()
      .then(async db => {
        if (db instanceof Error || db == null) {
          return null
        }
        const objectId = new ObjectId(id)

        return await db.collection(collection).findOne({ _id: objectId })
      })
  }

  async create (collection: string, data: Document): Promise<ObjectId | undefined> {
    return await this.connect()
      .then(async db => {
        if (db instanceof Error || db == null) {
          return null
        }
        return await db
          .collection(collection).insertOne(data)
      }).then(result => result?.insertedId)
  }

  async update (collection: string, id: string, data: Document | string): Promise<string | ObjectId> {
    return await this.connect()
      .then(async db => {
        if (db instanceof Error || db == null) {
          return null
        }

        const objectId = new ObjectId(id)

        return await db
          .collection(collection)
          .updateOne({ _id: objectId }, { $set: data }, { upsert: true })
      }).then(result => result?.upsertedId ?? id)
  }

  async delete (collection: string, id: string): Promise<string> {
    return await this.connect()
      .then(async db => {
        if (db instanceof Error || db == null) {
          return null
        }
        const objectId = new ObjectId(id)
        return await db
          .collection(collection).deleteOne({ _id: objectId })
      }).then(() => id)
  }
}
