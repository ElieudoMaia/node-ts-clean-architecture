import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-survey-repository'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find({}).toArray()
    const surveysDTO: SurveyModel[] = surveys.map(survey => {
      return {
        id: survey._id.toString(),
        question: survey.question,
        answers: survey.answers,
        date: survey.date
      }
    })
    return surveysDTO
  }

  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }
}
