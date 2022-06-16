import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols'
import { makeLoadAccountByTokenUseCase } from '../usecases/account/load-account-by-token/db-load-account-by-token'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByTokenUseCase = makeLoadAccountByTokenUseCase()
  return new AuthMiddleware(loadAccountByTokenUseCase, role)
}
