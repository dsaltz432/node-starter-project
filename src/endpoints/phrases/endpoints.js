'use strict';
const { HTTP_STATUS_CODES } = require('../../constants');
const { getPhrases, createPhrase, deletePhrase } = require('./phrases');

const GetPhrases = async(req, res) => {
  const { gameId } = req.params;

  const { phrases } = await getPhrases({ gameId });
  res.status(HTTP_STATUS_CODES.OK).json({ phrases });
};

const CreatePhrase = async(req, res) => {
  const { gameId } = req.params;
  const phrase = req.body;

  const { createdPhrase } = await createPhrase({ gameId, phrase });
  res.status(HTTP_STATUS_CODES.OK).json({ createdPhrase });
};

const DeletePhrase = async(req, res) => {
  const { gameId, phraseId } = req.params;

  await deletePhrase({ gameId, phraseId });
  res.status(HTTP_STATUS_CODES.NO_CONTENT).json();
};

module.exports = {
  GetPhrases,
  CreatePhrase,
  DeletePhrase,
};
