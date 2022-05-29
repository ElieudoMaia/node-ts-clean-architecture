import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthenticationUseCase } from '../../usecases/authentication/db-authentication-factory'
import { makeLoggerDecoratorController } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const authentication = makeDbAuthenticationUseCase()
  const validation = makeLoginValidation()
  const loginController = new LoginController(authentication, validation)
  return makeLoggerDecoratorController(loginController)
}
