import Joi from 'joi'
import Boom from '@hapi/boom'
import type { Request, Response, NextFunction } from 'express'
import { type MoviePartial } from '../../types'

function validate (data: MoviePartial, schema: MoviePartial): Joi.ValidationError | undefined {
  // const { error } = schema.validate(data)
  const { error } = Joi
    .object(schema)
    .validate(data)
  return error
}

export function validationHandler (schema: MoviePartial, check = 'body') {
  // console.log({ schema })
  return function (req: Request, _res: Response, next: NextFunction) {
    // console.log({ check })
    let error: Joi.ValidationError | undefined

    if (check !== 'body') {
      error = validate(req.params, schema)
    } else {
      error = validate(req.body, schema)
    }

    // error ? next(Boom.badRequest(error)) : next()
    if (error !== undefined) {
      next(Boom.badRequest(error))
    } else {
      next()
    }
  }
}
