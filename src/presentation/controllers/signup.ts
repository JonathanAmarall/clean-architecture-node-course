import { EmailValidator } from './../protocols/email-validator';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from './../protocols/http';
import { InvalidParamError } from '../errors/invalid-param-error';
import { ServerError } from '../errors/server-error';

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

      if (!this.emailValidator.isValid(httpRequest.body.email))
        return badRequest(new InvalidParamError('email'));
    } catch (error) {
      return serverError();
    }
  }
}
