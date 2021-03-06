/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import env from '../config/env'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AddSurveyModel } from '@/domain/usecases/add-survey'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (role?: string): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Fake User',
    email: 'elieudo.maia@gmail.com',
    password: '123',
    role
  })

  const id = res.insertedId.toString()
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({ _id: res.insertedId }, {
    $set: { accessToken }
  })
  return accessToken
}

const makeFakeSurveyModel = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    { image: 'any_image', answer: 'any_answer' },
    { answer: 'answer' }
  ],
  date: new Date()
})

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey withhout accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            { answer: 'Answer 1', image: 'http://image-name.com' },
            { answer: 'Answer 2' }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with a valid accessToken', async () => {
      const accessToken = await makeAccessToken('admin')
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurveyModel())
        .expect(204)
    })
  })

  test('Should return 200 on load surveys with a valid accessToken', async () => {
    const accessToken = await makeAccessToken()
    await surveyCollection.insertOne(makeFakeSurveyModel())
    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(200)
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load survey withhout accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
  })
})
