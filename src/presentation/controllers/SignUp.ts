import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/htttp-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return badRequest(new Error())
  }
}
