import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return a account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Elieudo',
        email: 'elieudo.maia@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
