import type { WithId, Document } from 'mongodb'
import { MongoLib } from '../lib/mongo'

export class ApiKeysService {
  private readonly collection: string
  private readonly mongoDB

  constructor () {
    this.collection = 'api-keys'
    this.mongoDB = new MongoLib()
  }

  async getApiKey ({ token }: { token: string }): Promise<WithId<Document> | null> {
    const apiKeys = await this.mongoDB.getAll(this.collection, { token })

    return apiKeys != null ? apiKeys[0] : null
  }
}
