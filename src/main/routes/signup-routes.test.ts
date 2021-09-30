import app from '../config/app';
import request from 'supertest';

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Jonathan',
        email: 'jonathan@mail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
