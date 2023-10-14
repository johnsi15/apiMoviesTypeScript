// DEBUG=app:* npx ts-node ./src/scripts/mongo/seedMovies.ts

import chalk from 'chalk'
import { debug } from 'debug'
import { MongoLib } from '../../lib/mongo'
import { fakeMovies } from '../../utils/mocks/movies'

const logger = debug('app:scripts:movies')

async function seedMovies (): Promise<void> {
  try {
    const mongoDB = new MongoLib()

    const promises = fakeMovies.map(async movie => {
      await mongoDB.create('movies', movie)
    })

    await Promise.all(promises)
    logger(chalk.green(`${promises.length} movies have been created succesfully`))
    return process.exit(0)
  } catch (error) {
    logger(chalk.red(error))
    process.exit(1)
  }
}

seedMovies().catch(err => {
  console.log(`Error seedMovies ${err}`)
  logger(chalk.red(err))
  process.exit(1)
})
