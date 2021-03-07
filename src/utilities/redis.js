'use strict';
const logger = require('./logger').getLogger('src.utilities.redis');
const redis = require('redis');
const commands = require('redis-commands');
const { promisify } = require('util');

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true';

let instance;

class Redis {

  static getInstance() {
    if (!instance) {
      instance = new Redis();
      return instance;
    }
    return instance;
  }

  enabled() {
    return REDIS_ENABLED;
  }

  connect() {

    if (!this.enabled()) {
      return;
    }

    // validate env variables
    if (!REDIS_HOST) {
      throw new Error('Failed to connect to redis because REDIS_HOST is not defined.');
    }
    if (!REDIS_PORT) {
      throw new Error('Failed to connect to redis because REDIS_PORT is not defined.');
    }

    const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;

    this.redis = redis.createClient(url);

    // bind redis commands as promises
    for (const command of commands.list) {
      this[command] = promisify(this.redis[command]).bind(this.redis);
    }

    logger.info('Connected to redis');
  }

}

module.exports = Redis;
