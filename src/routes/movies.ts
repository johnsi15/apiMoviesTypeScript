/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express } from 'express'
import passport from 'passport'
import { MoviesService } from '../services/movies'

import { createMovieSchema, movieIdSchema, updateMovieSchema } from '../schemas/movies'
import { validationHandler } from '../utils/middleware/validationHandler'
import { scopesValidationHandler } from '../utils/middleware/scopesValidation'

import { cacheResponse } from '../utils/cacheResponse'
import { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } from '../utils/time'

// JWT strategy
import '../utils/auth/strategies/jwt'

export function moviesApi (app: Express): void {
  const router = express.Router()
  app.use('/api/movies', router)

  const moviesService = new MoviesService()

  router.get('/public', async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    const { tags } = req.query as { tags: string[] | string }

    try {
      const movies = await moviesService.getMovies({ tags })

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read:movies']), async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    const { tags } = req.query as { tags: string[] | string }

    try {
      const movies = await moviesService.getMovies({ tags })

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read:movies']), validationHandler(movieIdSchema, 'params'), async function (req, res, next) {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

    const { movieId } = req.params

    try {
      const movie = await moviesService.getMovie({ movieId })

      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['create:movies']), validationHandler(createMovieSchema), async function (_req, res, next) {
    // const { body: movie } = req
    const movie = res.locals.data

    try {
      const createdMovieId = await moviesService.createMovie({ movie })

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.put('/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['update:movies']), validationHandler(movieIdSchema, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
    const { movieId } = req.params
    // const { body: movie } = req
    const movie = res.locals.data

    try {
      const updateMovieId = await moviesService.updateMovie({ movieId, movie })

      res.status(200).json({
        data: updateMovieId,
        message: 'movie update'
      })
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete:movies']), validationHandler(movieIdSchema, 'params'), async function (req, res, next) {
    const { movieId } = req.params

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId })

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      })
    } catch (err) {
      next(err)
    }
  })

  router.patch('/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['update:movies']), validationHandler(movieIdSchema, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
    const { movieId } = req.params
    // const { body: movie } = req
    const movie = res.locals.data

    try {
      const updateMovieId = await moviesService.patchMovie({ movieId, movie })

      res.status(200).json({
        data: updateMovieId,
        message: 'movie modified'
      })
    } catch (err) {
      next(err)
    }
  })
}
