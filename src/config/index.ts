import 'dotenv/config'

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT ?? 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER ?? '',
  dbPassword: process.env.DB_PASSWORD ?? '',
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT ?? '',
  authJwtSecret: process.env.AUTH_JWT_SECRET ?? 'jwt_secret',
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD ?? 'admin_password',
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD ?? 'password',
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
}
