import env from '../../../../config/env'
import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeLoadAccountByTokenUseCase = (): LoadAccountByToken => {
  const secret = env.jwtSecret
  return new DbLoadAccountByToken(new JwtAdapter(secret), new AccountMongoRepository())
}
