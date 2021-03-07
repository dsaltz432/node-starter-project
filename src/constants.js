'use strict';

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_CODES = {
  GAME_NOT_FOUND: { errorId: 'code.1', statusCode: HTTP_STATUS_CODES.NOT_FOUND, logged: true },
  PHRASE_NOT_FOUND: { errorId: 'code.2', statusCode: HTTP_STATUS_CODES.NOT_FOUND, logged: false },
};

const COLLECTIONS = {
  PHRASES: 'phrases',
};

module.exports = {
  HTTP_METHODS,
  HTTP_STATUS_CODES,
  ERROR_CODES,
  COLLECTIONS,
};
