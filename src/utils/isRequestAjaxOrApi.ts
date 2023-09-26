import type { Request } from 'express'

export function isRequestAjaxOrApi (req: Request): boolean {
  // return !req.accepts('html') || req.xhr
  console.log({ acceptsHtml: req.accepts('html') })
  const acceptsHtml = req.accepts('html') !== false // true != false = true
  const isXhr = req.xhr
  console.log({ acceptsHtml })
  console.log({ isXhr })

  return !acceptsHtml || isXhr // !true = false
}
