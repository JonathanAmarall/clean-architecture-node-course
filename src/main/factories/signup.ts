import { AccountMongoRepository } from './../../infra/criptografy/db/mongodb/account-repository/account';
import { BcryptAdapter } from './../../infra/criptografy/bcrypt-adapter';
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account';
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter';
import { SignUpController } from '../../presentation/controllers/signup/signup';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    addAccount
  );
  return signUpController;
};
