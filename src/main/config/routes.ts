import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  fg.sync('**/src/main/routes/**routes.ts').map(async (filePath) => {
    const route = (await import(`./../../../${filePath}`)).default
    route(router)
  })
  app.use('/api', router)
}
