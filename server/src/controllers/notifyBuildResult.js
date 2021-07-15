const agentsPool = require('../api/agentsPool');
const sendBuildResult = require('../api/sendBuildResult');
const ValidationError = require('../validators/errors/ValidationError');

module.exports = async (req, res, next) => {
  try {
    const { id, duration, status, log } = req.body;
    agentsPool.freeAgent(id);
    if (id && status) {
      await sendBuildResult(id, duration, status, log);
      res.status(200);
    } else {
      throw new ValidationError(400, 'Build id or status are missed');
    }
  } catch (error) {
    next(error);
  }
};
