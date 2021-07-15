const axios = require('axios');

module.exports = async (agent, buildId, repoName, commitHash, buildCommand) => {
  axios.post(`http://${agent.host}:${agent.port}/build`, {
    buildId,
    repoUrl: `git@github.com:${repoName}.git`,
    commitHash,
    buildCommand,
  });
};
