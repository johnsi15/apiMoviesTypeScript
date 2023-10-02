import boom from '@hapi/boom'
import type { NextFunction, Request, Response } from 'express'

export function scopesValidationHandler (allowedScopes: string[]) {
  return function (req: Request, _res: Response, next: NextFunction) {
    if (req.user?.scopes == null) {
      next(boom.unauthorized('Missing scopes'))
    }

    const hasAccess = allowedScopes.map(allowedScope => req.user?.scopes?.includes(allowedScope)).find(allowed => Boolean(allowed))

    if (hasAccess != null) {
      next()
    } else {
      next(boom.unauthorized('Insufficient scopes'))
    }
  }
}
