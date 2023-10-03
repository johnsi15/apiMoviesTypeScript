import type Joi from 'joi'
import Boom from '@hapi/boom'
import type { Request, Response, NextFunction } from 'express'
import { type ValidationData } from '../../types'

function validate<Tdata> (data: Tdata, schema: Joi.Schema): { error: Joi.ValidationError | undefined, value: Tdata | undefined } {
  // const { error } = Joi.object(schema).validate(data)
  const { error, value } = schema.validate(data, { stripUnknown: true })

  return { error, value }
}

export function validationHandler (schema: Joi.Schema, check = 'body') {
  // console.log({ schema })
  return function (req: Request, res: Response, next: NextFunction) {
    console.log({ check })
    // console.log({ schema })
    let validateResponse: { error: Joi.ValidationError | undefined, value: ValidationData | undefined }

    if (check === 'body') {
      validateResponse = validate<ValidationData>(req.body, schema)
    } else if (check === 'params') {
      validateResponse = validate<ValidationData>(req.params, schema)
    } else {
      validateResponse = validate<ValidationData>(req.query, schema)
    }

    // error ? next(Boom.badRequest(error)) : next()
    if (validateResponse.error !== undefined) {
      next(Boom.badRequest(validateResponse.error))
    } else {
      res.locals.data = validateResponse.value
      next()
    }
  }
}
