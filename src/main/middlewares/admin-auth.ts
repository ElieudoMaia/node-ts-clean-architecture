import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const adminAuthExpressMiddleware = adaptMiddleware(makeAuthMiddleware('admin'))
