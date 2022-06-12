import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/htttp-helper'
import { AuthMiddleware } from './auth-middleware'

describe('AuthMiddleware', () => {
  test('Should return 403 if has no x-access-token header', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
