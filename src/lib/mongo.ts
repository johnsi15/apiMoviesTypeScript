import { type Db, MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { config } from '../config/index'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`

export class MongoLib {
  private readonly client: MongoClient
  private readonly dbName: string | undefined
  private static connection: Db | Error

  constructor () {
    this.client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.dbName = DB_NAME
  }

  private async connect (): Promise<Db | Error> {
    if (MongoLib.connection != null) {
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

  async getAll (collection: string, query: Array<string | null>): Promise<string> {
    const database = await this.connect().then(async db => {
      if (db instanceof Error) {
        console.error('Error connecting to the database')
        console.error(db)
        return null // Handle the error gracefully, you can return null or throw an exception here.
      }

      return await db.collection(collection).find(query).toArray()
    })
    console.log(database)

    return 'hello world'
  }

  // get (collection, id) {
  //   return this.connect()
  //     .then(db => {
  //       return db
  //         .collection(collection).findOne({ _id: ObjectId(id) })
  //     })
  // }

  // create (collection, data) {
  //   return this.connect()
  //     .then(db => {
  //       return db
  //         .collection(collection).insertOne(data)
  //     }).then(result => result.insertedId)
  // }

  // update (collection, id, data) {
  //   return this.connect()
  //     .then(db => {
  //       return db
  //         .collection(collection)
  //         .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
  //     }).then(result => result.upsertedId || id)
  // }

  // delete (collection, id) {
  //   return this.connect()
  //     .then(db => {
  //       return db
  //         .collection(collection).deleteOne({ _id: ObjectId(id) })
  //     }).then(() => id)
  // }
}
