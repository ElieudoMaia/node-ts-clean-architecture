import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should call controller handle method', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          body: { name: 'Elieudo' },
          statusCode: 200
        }
        return await Promise.resolve(httpResponse)
      }
    }

    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenLastCalledWith(httpRequest)
  })
})
