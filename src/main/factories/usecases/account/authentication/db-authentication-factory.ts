import env from '../../../../config/env'
import { DBAuthentication } from '../../../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { Authentication } from '../../../../../domain/usecases/authentication'

export const makeDbAuthenticationUseCase = (): Authentication => {
  const hashSalts = 12
  const secret = env.jwtSecret

  const accountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(hashSalts)
  const jwtAdapter = new JwtAdapter(secret)
  return new DBAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
}
