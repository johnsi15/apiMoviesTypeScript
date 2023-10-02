/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import type { Express } from 'express'
import passport from 'passport'

import { UserMoviesService } from '../services/userMovies'
import { validationHandler } from '../utils/middleware/validationHandler'
import { scopesValidationHandler } from '../utils/middleware/scopesValidation'

import { movieIdSchema } from '../schemas/movies'
import { userIdSchema } from '../schemas/users'
import { createUserMovieSchema } from '../schemas/userMovies'

// JWT strategy
require('../utils/auth/strategies/jwt')

export function userMoviesApi (app: Express): void {
  const router = express.Router()
  app.use('/api/user-movies', router)

  const userMoviesService = new UserMoviesService()

  router.get('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read:user-movies']), validationHandler(userIdSchema, 'query'), async function (req, res, next) {
    const { userId } = req.query as { userId: string }

    try {
      const userMovies = await userMoviesService.getUserMovies({ userId })

      res.status(200).json({
        data: userMovies,
        message: 'user movies listed'
      })
    } catch (error) {
      next(error)
    }
  }
  )

  router.post('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['create:user-movies']), validationHandler(createUserMovieSchema), async function (req, res, next) {
    const { body: userMovie } = req

    try {
      const createdUserMovieId = await userMoviesService.createUserMovie({
        userMovie
      })

      res.status(201).json({
        data: createdUserMovieId,
        message: 'user movie created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:userMovieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete:user-movies']), validationHandler(movieIdSchema, 'params'), async function (req, res, next) {
    const { userMovieId } = req.params

    try {
      const deletedUserMovieId = await userMoviesService.deleteUserMovie({
        userMovieId
      })

      res.status(200).json({
        data: deletedUserMovieId,
        message: 'user movie deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}
