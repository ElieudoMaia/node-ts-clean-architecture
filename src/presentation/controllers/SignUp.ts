import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/htttp-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    return badRequest(new MissingParamError('email'))
  }
}
