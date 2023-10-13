import jwt from 'jsonwebtoken'
import { type User } from '../types'
import { config } from '../config'

export function createAuthToken ({ user }: { user?: User }): string {
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

  const payload = {
    sub: '1',
    name: user?.name ?? 'test',
    email: user?.email ?? 'test@email.com',
    scopes: adminScopes
  }

  const token = jwt.sign(payload, config.authJwtSecret, {
    expiresIn: '15m'
  })

  return token
}
