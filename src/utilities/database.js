'use strict';
const logger = require('./logger').getLogger('src.utilities.database');
const { connect } = require('mongodb');

const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;

let instance;

class Database {

  static getInstance() {
    if (!instance) {
      instance = new Database();
      return instance;
    }
    return instance;
  }

  async connect() {

    // validate env variables
    if (!MONGO_CONNECTION_URL) {
      throw new Error('Failed to connect to mongo because MONGO_CONNECTION_URL is not defined.');
    }

    this.client = await connect(MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('Connected to mongo database');
  }

  getClient() {
    return this.client;
  }

  getDb() {
    return this.client.db();
  }

  getCollection(collection) {
    return this.getDb().collection(collection);
  }

}

module.exports = Database;
