// DEBUG=app:* node scripts/mongo/seedMovies.js

import chalk from 'chalk'
import { MongoLib } from '../../lib/mongo'
import { moviesMock } from '../../utils/mocks/movies'
// const debug = require('debug')('app:scripts:movies')
import { debug } from 'debug'

const logger = debug('app:scripts:movies')

async function seedMovies (): Promise<void> {
  try {
    const mongoDB = new MongoLib()

    const promises = moviesMock.map(async movie => {
      await mongoDB.create('movies', movie)
    })

    await Promise.all(promises)
    logger(chalk.green(`${promises.length} movies have been created succesfully`)) // prettier-ignore
    return process.exit(0)
  } catch (error) {
    logger(chalk.red(error))
    process.exit(1)
  }
}

seedMovies().catch(err => {
  console.log(`Error seedMovies ${err}`)
})
