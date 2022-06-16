import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLoggerDecoratorController } from '../../../decorators/log-controller-decorator-factory'
import { makeAddSurveyUseCase } from '../../../usecases/survey/add-survey/db-add-survey'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyControllerFactory = (): Controller => {
  const validation = makeAddSurveyValidation()
  const addSurvey = makeAddSurveyUseCase()
  const controller = new AddSurveyController(validation, addSurvey)
  return makeLoggerDecoratorController(controller)
}
