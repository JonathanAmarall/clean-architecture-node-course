import { MongoHelper } from './../infra/criptografy/db/mongodb/account-repository/helpers/mongo-helper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
