import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/htttp-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

const requiredFields = ['name', 'email']

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return badRequest(new Error())
  }
}
