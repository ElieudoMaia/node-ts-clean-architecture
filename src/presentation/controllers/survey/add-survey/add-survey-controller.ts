import { badRequest, serverError } from '../../../helpers/http/htttp-helper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      await this.addSurvey.add(httpRequest.body)

      return { body: {}, statusCode: 200 }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
