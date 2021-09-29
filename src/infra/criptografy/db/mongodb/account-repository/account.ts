import { MongoHelper } from './helpers/mongo-helper';
import { AccountModel } from '../../../../../domain/models/account-model';
import { AddAccountModel } from '../../../../../domain/usecases/add-account';
import { AddAccountRepository } from './../../../../../data/protocols/add-account-repository';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return Object.assign({}, accountData, { id: result.insertedId.toString() });
  }
}
