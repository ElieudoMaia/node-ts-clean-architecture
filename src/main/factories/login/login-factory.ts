import env from '../../config/env'
import { DBAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const hashSalts = 12
  const secret = env.jwtSecret

  const accountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(hashSalts)
  const jwtAdapter = new JwtAdapter(secret)
  const authentication = new DBAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
  const validation = makeLoginValidation()
  const loginController = new LoginController(authentication, validation)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
