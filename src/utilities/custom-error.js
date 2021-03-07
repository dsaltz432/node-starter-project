'use strict';

class CustomError extends Error {

  constructor({ errorCode, message, details }) {
    super();
    this.name = 'CustomError';
    this.errorId = errorCode.errorId;
    this.statusCode = errorCode.statusCode;
    this.logged = errorCode.logged;
    this.message = message;
    this.details = details;
  }

}

module.exports = CustomError;
