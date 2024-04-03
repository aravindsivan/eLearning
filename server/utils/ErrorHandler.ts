export default class ErrorHandler extends Error {
  message: any;
  statusCode: Number;
  constructor(message: any, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
