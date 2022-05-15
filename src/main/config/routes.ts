import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  const routesPath = path.resolve(__dirname, '..', 'routes')
  readdirSync(routesPath).forEach((fileName) => {
    (async () => {
      if (!fileName.includes('.test.')) {
        const route = (await import(`../routes/${fileName}`)).default
        route(router)
      }
    })().catch((error) => {
      console.error('Erro ao importar rotas', error)
    })
  })
  app.use('/api', router)
}
