import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { config } from './config/index'
import { moviesApi } from './routes/movies'
import { userMoviesApi } from './routes/userMovies'
import { authApi } from './routes/auth'
import { wrapErrors, logErrors, clientErrorHandler } from './utils/middleware/errorHandlers'
import { notFoundHandler } from './utils/middleware/notFoundHandler'
const app = express()

// On PORT
const port = config.port

const corsOptions = {
  origin: ['http://localhost', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT'] // 'DELETE','UPDATE','PUT','PATCH'
}

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))

app.disable('x-powered-by')

// Routes
authApi(app)
moviesApi(app)
userMoviesApi(app)

// Catch 404
app.use(notFoundHandler)

// Errors middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)

app.listen(port, () => {
  console.log(`Server on listing http://localhost${port}`)
})
