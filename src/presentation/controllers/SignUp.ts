import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/htttp-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      return badRequest(new Error())
    } catch (error) {
      return serverError()
    }
  }
}
