import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpResponse, HttpRequest } from './../protocols/http'
export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requireFields = ['name', 'email', 'password']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
