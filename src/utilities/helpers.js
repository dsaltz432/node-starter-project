'use strict';
const uuid = require('uuid/v4');

const createUUID = () => {
  return uuid().toString();
};

module.exports = {
  createUUID,
};
