import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

import { UsersService } from '../../../services/users'

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    const userService = new UsersService()

    try {
      const user = await userService.getUser({ email })

      if (user == null) {
        cb(boom.unauthorized(), false); return
      }

      if (!(await bcrypt.compare(password, user.password))) {
        cb(boom.unauthorized(), false); return
      }

      delete user.password

      cb(null, user)
    } catch (error) {
      cb(error)
    }
  })
)
