import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { serverError } from '../../presentation/helpers/http/htttp-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        body: { name: 'Elieudo' },
        statusCode: 200
      }
      return await Promise.resolve(httpResponse)
    }
  }
  return new ControllerStub()
}
const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stackError: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}

const makeFakeRequestData = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'invalid_email',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface sutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): sutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    controllerStub,
    logErrorRepositoryStub,
    sut
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle method', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequestData())
    expect(handleSpy).toHaveBeenLastCalledWith(makeFakeRequestData())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequestData())
    expect(httpResponse).toEqual({
      body: { name: 'Elieudo' },
      statusCode: 200
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(error)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(makeFakeRequestData())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
