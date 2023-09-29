// DEBUG=app:* npx ts-node ./src/scripts/mongo/seedUsers.ts

import bcrypt from 'bcrypt'
import chalk from 'chalk'
import { debug } from 'debug'
import { MongoLib } from '../../lib/mongo'
import { config } from '../../config/index'
import { type User } from '../../types'
import { type ObjectId } from 'mongodb'

const logger = debug('app:scripts:users')

const users: User[] = [
  {
    email: 'root@johnserrano.co',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true
  },
  {
    email: 'andrey@johnserrano.co',
    name: 'John Andrey',
    password: config.defaultUserPassword
  },
  {
    email: 'amy@johnserrano.co',
    name: 'Ammi Andrea',
    password: config.defaultUserPassword
  }
]

async function createUser (mongoDB: MongoLib, user: User): Promise<ObjectId | undefined> {
  const { name, email, password, isAdmin } = user
  const hashedPassword = await bcrypt.hash(password, 10)

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  })

  return userId
}

async function seedUsers (): Promise<void> {
  try {
    const mongoDB = new MongoLib()

    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user)
      logger(chalk.green('User created with id:', userId))
    })

    await Promise.all(promises)
    return process.exit(0)
  } catch (error) {
    logger(chalk.red(error))
    process.exit(1)
  }
}

seedUsers().catch(err => {
  logger(chalk.red(`Error seedUsers ${err}`))
  process.exit(1)
})
