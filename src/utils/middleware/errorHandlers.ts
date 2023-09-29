import { debug } from 'debug'
import Boom, { type Boom as BoomType } from '@hapi/boom'
import type { NextFunction, Request, Response } from 'express'

import { config } from '../../config'

import { isRequestAjaxOrApi } from '../isRequestAjaxOrApi'
const logger = debug('app:handlersError')

// Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` })

export function withErrorStack (err: Error, stack: string | undefined): Error {
  // console.log({ dev: config.dev })

  if (config.dev) {
    return { ...err, stack }
  } else {
    return { ...err }
  }
}

export function logErrors (err: Error, _req: Request, _res: Response, next: NextFunction): void {
  // Sentry.captureException(err)
  logger(err.stack)
  // console.log({ stackError: err.stack })
  next(err)
}

export function wrapErrors (err: BoomType, _req: Request, _res: Response, next: NextFunction): void {
  if (!err.isBoom) {
    next(Boom.badImplementation(err)); return
  }

  next(err)
}

export function clientErrorHandler (err: BoomType, req: Request, res: Response, next: NextFunction): void {
  const {
    output: { statusCode, payload }
  } = err

  // Necesitamos adaptar el payload de Boom al tipo Error
  const adaptedError: Error = new Error(payload.message ?? 'An error occurred')
  adaptedError.name = payload.error ?? 'Internal Server Error'
  adaptedError.stack = err.stack

  // catch errors for AJAX request or if an error ocurrs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(adaptedError, err.stack))
  } else {
    next(err)
  }
}

// Gestionar errores con un engine html
export function errorHandler (err: BoomType, _req: Request, res: Response, _next: NextFunction): void {
  const {
    output: { statusCode, payload }
  } = err

  // Necesitamos adaptar el payload de Boom al tipo Error
  const adaptedError: Error = new Error(payload.message ?? 'An error occurred')
  adaptedError.name = payload.error ?? 'Internal Server Error'
  adaptedError.stack = err.stack

  res.status(statusCode)
  res.render('error', withErrorStack(adaptedError, err.stack))
}
