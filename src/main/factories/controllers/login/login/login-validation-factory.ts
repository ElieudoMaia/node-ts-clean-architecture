import { Validation } from '@/presentation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()

  const validations: Validation[] = []
  validations.push(new EmailValidation('email', emailValidator))
  const requiredFields = ['email', 'password']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
