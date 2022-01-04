import env from './config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { default: app } = await import('./config/app')
    app.listen(env.port, () => {
      console.log(`Server running at port ${env.port}`)
    })
  })
  .catch(console.error)
