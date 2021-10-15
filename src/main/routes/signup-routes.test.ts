import { MongoHelper } from './../../infra/criptografy/db/mongodb/account-repository/helpers/mongo-helper';
import app from '../config/app';
import request from 'supertest';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollecion = MongoHelper.getCollection('accounts');
    await accountCollecion.deleteMany({});
  });
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
