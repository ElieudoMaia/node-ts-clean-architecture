import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuthExpressMiddleware } from '../middlewares/admin-auth'
import { authExpressMiddleware } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuthExpressMiddleware, adaptRoute(makeAddSurveyControllerFactory()))
  router.get('/surveys', authExpressMiddleware, adaptRoute(makeLoadSurveysController()))
}
