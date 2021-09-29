import { MongoHelper } from './helpers/mongo-helper';
import { AccountModel } from '../../../../../domain/models/account-model';
import { AddAccountModel } from '../../../../../domain/usecases/add-account';
import { AddAccountRepository } from './../../../../../data/protocols/add-account-repository';
import { assert } from 'console';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    console.log(result.insertedId.toString());
    //const account = result.ops[0];
    return Object.assign({}, accountData, { id: result.insertedId.toString() });
  }
}
