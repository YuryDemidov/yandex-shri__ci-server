const { ValidationError } = require('../validators/errors/ValidationError');
const agentsPool = require('../api/agentsPool');

module.exports = (req, res, next) => {
  try {
    const { hostname, port } = req.body;
    if (hostname && port) {
      !agentsPool.getAgent(hostname, port) && agentsPool.registerAgent(hostname, port);
      res.status(200);
    } else {
      throw new ValidationError(400, 'Hostname or port are missed');
    }
  } catch (error) {
    next(error);
  }
};
