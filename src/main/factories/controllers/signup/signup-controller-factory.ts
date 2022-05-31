import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoggerDecoratorController } from '../../decorators/log-controller-decorator-factory'
import { makeAddAccountUseCase } from '../../usecases/add-acccount/db-add-account'
import { makeDbAuthenticationUseCase } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const addAccount = makeAddAccountUseCase()
  const validationComposite = makeSignUpValidation()
  const authentication = makeDbAuthenticationUseCase()
  const signupController = new SignUpController(addAccount, validationComposite, authentication)
  return makeLoggerDecoratorController(signupController)
}
