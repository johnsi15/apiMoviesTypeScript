import type { Request } from 'express'

export function isRequestAjaxOrApi (req: Request): boolean {
  // return !req.accepts('html') || req.xhr
  // req.xhr -> header - X-Requested-With: XMLHttpRequest
  const acceptsJson = req.accepts(['html', 'json']) === 'json' || req.get('Content-Type') === 'application/json'
  const isXhr = req.xhr

  return acceptsJson || isXhr
}
