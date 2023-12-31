/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import passport from 'passport'
import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import type { Express, Request, Response, NextFunction } from 'express'
import type { User } from '../types'
import { ApiKeysService } from '../services/apiKeys'
import { UsersService } from '../services/users'
import { validationHandler } from '../utils/middleware/validationHandler'

import { createUserSchema, createProviderUserSchema } from '../schemas/users'

import { config } from '../config'

// Basic strategy
import '../utils/auth/strategies/basic'

export function authApi (app: Express): void {
  const router = express.Router()
  app.use('/api/auth', router)

  const apiKeysService = new ApiKeysService()
  const usersService = new UsersService()

  router.post('/sign-in', function (req: Request, res: Response, next: NextFunction) {
    const { apiKeyToken } = req.body

    if (apiKeyToken == null) {
      next(boom.unauthorized('apiKeyToken is required')); return
    }

    passport.authenticate('basic', function (error: Error | null, user: User) {
      try {
        if (error != null || user === undefined) {
          next(boom.unauthorized()); return
        }

        req.login(user, { session: false }, async function (loginError: Error) {
          if (loginError != null) {
            next(loginError); return
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

          if (apiKey == null) {
            // console.log({ apiKey })
            next(boom.unauthorized()); return
          }

          const { _id: id, name, email } = user

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey?.scopes
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          })

          res.status(200).json({ token, user: { id, name, email } })
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  })

  router.post('/sign-up', validationHandler(createUserSchema), async function (req, res, next) {
    const { body: user } = req

    try {
      const createdUserId = await usersService.createUser({ user })

      res.status(201).json({
        data: createdUserId,
        message: 'user created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/sign-provider', validationHandler(createProviderUserSchema), async function (req, res, next) {
    const { body } = req

    const { apiKeyToken, ...user } = body

    if (apiKeyToken == null) {
      next(boom.unauthorized('apiKeyToken is required')); return
    }

    try {
      const queriedUser = await usersService.getOrCreateUser({ user })
      const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

      if (apiKey == null) {
        next(boom.unauthorized()); return
      }

      if (queriedUser == null) {
        next(boom.unauthorized())
      } else {
        const { _id: id, name, email } = queriedUser

        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey?.scopes
        }

        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m'
        })

        res.status(200).json({ token, user: { id, name, email } })
      }
    } catch (error) {
      next(error)
    }
  })
}
