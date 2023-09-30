import Joi from 'joi'
import Boom from '@hapi/boom'
import type { Request, Response, NextFunction } from 'express'
import { type ValidationData } from '../../types'

function validate<Tdata> (data: Tdata, schema: Joi.Schema): Joi.ValidationError | undefined {
  // const { error } = schema.validate(data)
  const { error } = Joi
    .object(schema)
    .validate(data)
  return error
}

export function validationHandler (schema: Joi.Schema, check = 'body') {
  // console.log({ schema })
  return function (req: Request, _res: Response, next: NextFunction) {
    // console.log({ check })
    let error: Joi.ValidationError | undefined

    if (check !== 'body') {
      error = validate<ValidationData>(req.params, schema)
    } else {
      error = validate<ValidationData>(req.body, schema)
    }

    // error ? next(Boom.badRequest(error)) : next()
    if (error !== undefined) {
      next(Boom.badRequest(error))
    } else {
      next()
    }
  }
}
