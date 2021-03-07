'use strict';
const database = require('../../utilities/database').getInstance();
const redis = require('../../utilities/redis').getInstance();
const logger = require('../../utilities/logger').getLogger('endpoints.phrases');
const CustomError = require('../../utilities/custom-error');
const { createUUID } = require('../../utilities/helpers');
const { ERROR_CODES, COLLECTIONS } = require('../../constants');

const getPhrasesCollection = () => {
  return database.getCollection(COLLECTIONS.PHRASES);
};

const getPhrasesRedisKey = gameId => {
  return `phrases:gameId:${gameId}`;
};

const getPhrases = async({ gameId }) => {

  const mongoPhrases = await getPhrasesCollection().find({ gameId }).toArray();

  const response = {
    phrases: {
      mongoPhrases,
    },
  };

  if (redis.enabled()) {
    const redisPhrases = await redis.hgetall(getPhrasesRedisKey(gameId)) || [];

    logger.info(`Redis phrases: ${redisPhrases}`);

    response.phrases.redisPhrases = redisPhrases;
  }

  return response;
};

const createPhrase = async({ gameId, phrase }) => {

  const phraseId = createUUID();

  const phraseObject = {
    _id: phraseId,
    gameId,
    ...phrase,
  };

  logger.info(`Creating phrase ${phraseId}`);

  await getPhrasesCollection().insertOne(phraseObject);

  if (redis.enabled()) {
    await redis.hset(getPhrasesRedisKey(gameId), phraseId, JSON.stringify(phraseObject));
  }

  return {
    createdPhrase: phraseObject,
  };
};

const deletePhrase = async({ gameId, phraseId }) => {

  const phrase = await getPhrasesCollection().findOne({ _id: phraseId, gameId });

  if (!phrase) {
    throw new CustomError({ errorCode: ERROR_CODES.GAME_NOT_FOUND, message: `Phrase ${phraseId} not found for game ${gameId}.` });
  }

  logger.info(`Deleting phrase ${phraseId}`);

  await getPhrasesCollection().deleteOne({ _id: phraseId });

  if (redis.enabled()) {
    await redis.hdel(getPhrasesRedisKey(gameId), phraseId);
  }

};

module.exports = {
  getPhrases,
  createPhrase,
  deletePhrase,
};
