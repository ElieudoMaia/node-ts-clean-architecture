import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyControllerFactory()))
}
