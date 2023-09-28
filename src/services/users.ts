import bcrypt from 'bcrypt'
import type { WithId, Document, ObjectId } from 'mongodb'
import { type User } from '../types'
import { MongoLib } from '../lib/mongo'

export class UsersService {
  private readonly collection: string
  private readonly mongoDB

  constructor () {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async getUser ({ email }: { email: string }): Promise<WithId<Document> | null> {
    const users = await this.mongoDB.getAll(this.collection, { email })

    return users != null ? users[0] : null
  }

  async createUser ({ user }: { user: User }): Promise<ObjectId | undefined> {
    const { name, email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    })

    return createUserId
  }

  async getOrCreateUser ({ user }: { user: User }): Promise<WithId<Document> | null> {
    const queriedUser = await this.getUser({ email: user.email })
    console.log({ queriedUser })

    if (queriedUser != null) {
      return queriedUser
    }

    await this.createUser({ user })

    const newUser = await this.getUser({ email: user.email })
    return newUser
  }
}
