/* eslint-disable @typescript-eslint/no-misused-promises */
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import boom from '@hapi/boom'

import { UsersService } from '../../../services/users'
import { config } from '../../../config'
// import { type UserPassport } from '../../../types'

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb): Promise<void> {
      const usersService = new UsersService()
      console.log({ tokenPayload })

      try {
        const user = await usersService.getUser({ email: tokenPayload.email })

        if (user == null) {
          cb(boom.unauthorized(), false); return
        }

        delete user.password

        cb(null, { ...user, scopes: tokenPayload.scopes })
      } catch (error) {
        cb(error)
      }
    }
  )
)
