const sendBuildToAgent = require('./agent/startBuild');
const dbBuildStart = require('./db/buildStart');
const agentsPool = require('./agentsPool');

module.exports = async (agent, build, repoName, buildCommand) => {
  const { id, commitHash } = build;
  agent.buildId = id;
  try {
    await sendBuildToAgent(agent, id, repoName, commitHash, buildCommand);
    await dbBuildStart(id, new Date());
  } catch (error) {
    console.log(`Build ${id} was failed to start on agent ${agent.host}:${agent.port}. Agent will be removed`);
    agentsPool.removeAgent(agent.host, agent.port);
    return false;
  }
  return true;
};
