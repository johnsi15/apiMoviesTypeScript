import { type Response } from 'express'
import { config } from '../config'

export function cacheResponse (res: Response, seconds: number): void {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`)
  }
}
