import express from 'express'
import helmet from 'helmet'

import { config } from './config/index'
import { moviesApi } from './routes/movies'
// import userMoviesApi from './routes/userMovies'
// import authApi from './routes/auth'
// import { wrapErrors, logErrors, errorHandler } from './utils/middleware/errorHandlers'
import { notFoundHandler } from './utils/middleware/notFoundHandler'
const app = express()
const port = config.port

// body-parser
app.use(express.json())
app.use(helmet())

// Routes
// authApi(app)
moviesApi(app)
// userMoviesApi(app)

// Catch 404
app.use(notFoundHandler)

// Errors middleware
// app.use(logErrors)
// app.use(wrapErrors)
// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server on listing http://localhost${port}`)
})
