import { HttpResponse, HttpRequest, EmailValidator } from './../protocols';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
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

      const { email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'));

      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidParamError('email'));
    } catch (error) {
      return serverError();
    }
  }
}
