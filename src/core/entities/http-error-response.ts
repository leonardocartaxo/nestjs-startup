import InternalServerError from './internal-server-error';

export default class HttpErrorResponse {
  code: number;
  date?: Date = new Date();
  path: string;
  method: string;
  message: string;
  internalServerError: InternalServerError;
}
