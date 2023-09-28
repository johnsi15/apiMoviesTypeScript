// DEBUG=app:* npx ts-node ./src/scripts/mongo/seedApiKeys.ts

import chalk from 'chalk'
import crypto from 'node:crypto'
import { debug } from 'debug'
import { MongoLib } from '../../lib/mongo'

const logger = debug('app:scripts:api-keys')

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'create:movies',
  'update:movies',
  'delete:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies'
]

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies'
]

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
]

function generateRandomToken (): string {
  const buffer = crypto.randomBytes(32)
  return buffer.toString('hex')
}

async function seedApiKeys (): Promise<void> {
  try {
    const mongoDB = new MongoLib()

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create('api-keys', apiKey)
    })

    await Promise.all(promises)
    logger(chalk.green(`${promises.length} api keys have been created succesfully`))
    return process.exit(0)
  } catch (error) {
    logger(chalk.red(error))
    process.exit(1)
  }
}

seedApiKeys().catch(err => {
  logger(chalk.red(`Error seedApiKeys ${err}`))
  process.exit(1)
})
