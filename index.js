'use strict';

// initialize config as the very first step
require('dotenv').config();

const logger = require('./src/utilities/logger').getLogger('index');
const webapp = require('./src/utilities/webapp');
const database = require('./src/utilities/database').getInstance();
const redis = require('./src/utilities/redis').getInstance();

const { GetPhrases, CreatePhrase, DeletePhrase } = require('./src/endpoints/phrases/endpoints');
webapp.get('/v1/saladbowl/games/:gameId/phrases', GetPhrases);
webapp.post('/v1/saladbowl/games/:gameId/phrases', CreatePhrase);
webapp.delete('/v1/saladbowl/games/:gameId/phrases/:phraseId', DeletePhrase);


const start = async() => {

  // connect to mongo
  await database.connect();

  // connect to redis
  redis.connect();

  // start webapp
  webapp.start();

};

start()
  .then(() => {
    logger.info(`Saladbowl started up using node version ${process.version}`);
  })
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
