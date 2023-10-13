import express, { type Express } from 'express'
import supertest, { type SuperTest, type Test } from 'supertest'

export type RouteHandler = (app: Express) => void

export function testServer (route: RouteHandler): SuperTest<Test> {
  const app = express()
  route(app)
  return supertest(app)
}

export function testServerAgent (route: RouteHandler): SuperTest<Test> {
  const app = express()
  route(app)
  return supertest.agent(app)
}
