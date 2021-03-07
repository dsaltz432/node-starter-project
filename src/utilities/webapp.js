'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { HTTP_METHODS } = require('../constants');
const logger = require('./logger').getLogger('src.utilities.webapp');
const { timeEndpoint, asyncFunctionHandler, globalErrorHandler, fileNotFoundHandler } = require('./middleware');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const registerEndpoint = (method, path, next) => {

  logger.info(`Endpoint ${method} ${path} registered.`);

  const middleware = [];

  middleware.push(timeEndpoint(path));

  switch (method) {
    case HTTP_METHODS.GET:
      app.get(path, middleware, asyncFunctionHandler(next));
      break;
    case HTTP_METHODS.POST:
      app.post(path, middleware, asyncFunctionHandler(next));
      break;
    case HTTP_METHODS.PUT:
      app.put(path, middleware, asyncFunctionHandler(next));
      break;
    case HTTP_METHODS.PATCH:
      app.patch(path, middleware, asyncFunctionHandler(next));
      break;
    case HTTP_METHODS.DELETE:
      app.delete(path, middleware, asyncFunctionHandler(next));
      break;
    default:
      throw new Error(`Unsupported http method [${method}]`);
  }

};

const start = () => {

  app.use(globalErrorHandler);

  // 404 error handler must come last
  app.use(fileNotFoundHandler);

  app.listen(PORT);

  logger.info(`Webapp started listening on port ${PORT}`);
};

module.exports = {
  start,
  get: (path, next) => registerEndpoint(HTTP_METHODS.GET, path, next),
  post: (path, next) => registerEndpoint(HTTP_METHODS.POST, path, next),
  put: (path, next) => registerEndpoint(HTTP_METHODS.PUT, path, next),
  patch: (path, next) => registerEndpoint(HTTP_METHODS.PATCH, path, next),
  delete: (path, next) => registerEndpoint(HTTP_METHODS.DELETE, path, next),
};
