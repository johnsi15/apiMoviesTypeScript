import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import boom from '@hapi/boom'

import { UsersService } from '../../../services/users'
import { config } from '../../../config'

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb) {
      const usersService = new UsersService()
      console.log({ tokenPayload })

      try {
        const user = await usersService.getUser({ email: tokenPayload.email })

        if (user == null) {
          return cb(boom.unauthorized(), false)
        }

        delete user.password

        cb(null, { ...user, scopes: tokenPayload.scopes })
      } catch (error) {
        return cb(error)
      }
    }
  )
)
