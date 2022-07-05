import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call validationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    validations.push(new EmailValidation('email', makeEmailValidator()))
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
