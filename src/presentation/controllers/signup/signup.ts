import {
  EmailValidator,
  AddAccount,
  HttpRequest,
  HttpResponse,
} from './signup-protocols';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { Controller } from '../../protocols/controller';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requireFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body;

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'));

      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidParamError('email'));

      const account = this.addAccount.add({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
