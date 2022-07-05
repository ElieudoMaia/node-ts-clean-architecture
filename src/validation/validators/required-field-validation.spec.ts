import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation successed', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'valid_field' })
    expect(error).toBeFalsy()
  })
})
