/*
  mocha: nos ayuda a correr los test
  supertest: levanta un servidor temporal
  sinon: crea mocks para tests
  proxyquire inyecta los mocks cuando se requieren los paquetes
*/

// import { testServer } from '../utils/testServer'
// import { moviesMock, MoviesServiceMock } from '../utils/mocks/movies.js'

// describe('routes - movies', function () {
//   const route = proxyquire('../routes/movies', {
//     '../services/movies': MoviesServiceMock
//   })

//   const request = testServer(route)

//   describe('GET /movies', function () {
//     it('should respond with status 200', function (done) {
//       request.get('/api/movies').expect(200, done)
//     })

//     it('should respond with the list of movies', function (done) {
//       request.get('/api/movies').end((err, res) => {
//         if (err) {
//           console.log(':( algo salio mal!')
//           done()
//         }

//         assert.deepEqual(res.body, {
//           data: moviesMock,
//           message: 'movies listed'
//         })

//         done()
//       })
//     })
//   })
// })

function sum (a: number, b: number): number {
  return a + b
}

test('basic again', () => {
  expect(sum(1, 2)).toBe(3)
})
