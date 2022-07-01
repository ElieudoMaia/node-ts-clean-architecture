import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeLoadSurveysUseCase = (): LoadSurveys => {
  return new DbLoadSurveys(new SurveyMongoRepository())
}
