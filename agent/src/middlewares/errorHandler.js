const ValidationError = require('../validators/errors/ValidationError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return err.sendResponse(res);
  }

  return res.status(500).send(err.message);
};
