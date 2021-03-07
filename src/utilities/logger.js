'use strict';
const log4js = require('log4js');

log4js.configure({
  appenders: {defaultConsole: {type: 'console', layout: {type: 'pattern', pattern: '%p: [%c] %m'}}},
  categories: {default: {appenders: ['defaultConsole'], level: 'info'}},
});

const getLogger = category => {
  return log4js.getLogger(category);
};

module.exports = {
  getLogger,
};
