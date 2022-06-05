export interface AnswerModel {
  answer: string
  image?: string
}

export interface AddSurveyModel {
  question: string
  answers: AnswerModel[]
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
