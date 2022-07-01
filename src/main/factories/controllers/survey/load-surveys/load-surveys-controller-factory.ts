import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLoggerDecoratorController } from '../../../decorators/log-controller-decorator-factory'
import { makeLoadSurveysUseCase } from '../../../usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysUseCase = makeLoadSurveysUseCase()
  const controller = new LoadSurveysController(loadSurveysUseCase)
  return makeLoggerDecoratorController(controller)
}
