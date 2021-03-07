'use strict';
const logger = require('./logger').getLogger('src.utilities.middleware');
const CustomError = require('./custom-error');
const { HTTP_STATUS_CODES } = require('../constants');

const timeEndpoint = path => {
  return function(req, res, next) {
    const startTime = new Date().getTime();
    res.on('finish', function() {
      const elapsedTime = new Date().getTime() - startTime;
      logger.info(`EndpointTiming: Path: ${path} took ${elapsedTime} milliseconds`);
    });
    next();
  };
};

const asyncFunctionHandler = fn => {
  return async function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};

const globalErrorHandler = async(err, req, res, next) => {

  let statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  let logged = true;
  let errorId;
  let message;
  let details;

  if (err instanceof CustomError) {
    ({ errorId, statusCode, message, details, logged } = err);
  } else {
    details = err.stack;
  }

  if (logged) {
    let logMessage = '';
    if (errorId) {
      logMessage = `errorId: ${errorId}`;
    }
    if (message) {
      logMessage = `${logMessage}, message: ${message}`;
    }
    if (details) {
      logger.error(`${logMessage}, details: `, details);
    } else {
      logger.error(logMessage);
    }
  }

  const response = {
    ...(errorId && { errorId }),
    ...(message && { message }),
    ...(details && { details }),
  };

  res.status(statusCode).json(response);
};

const fileNotFoundHandler = (req, res) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json(`Endpoint ${req.method} ${req.path} does not exist`);
};

module.exports = {
  timeEndpoint,
  asyncFunctionHandler,
  globalErrorHandler,
  fileNotFoundHandler,
};
