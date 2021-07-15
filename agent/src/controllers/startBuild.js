const { ValidationError } = require('../validators/errors/ValidationError');

const agent = require('../agent');

module.exports = (req, res, next) => {
  const { buildId, repoUrl, commitHash, buildCommand } = req.body;

  try {
    if (!buildId || !repoUrl || !commitHash || !buildCommand) {
      throw new ValidationError(400, 'The required params are missed');
    }

    if (agent.isBusy()) {
      res.status(500).send('The agent is busy');
    }

    agent.startBuild(buildId, repoUrl, commitHash, buildCommand);

    res.status(200).send();
  } catch (e) {
    next(e);
  }
};
