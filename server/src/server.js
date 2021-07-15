const agentsPool = require('./api/agentsPool');
const getSettings = require('./api/db/getSettings');
const getWaitingBuilds = require('./api/db/getAllWaitingBuilds');
const startBuild = require('./api/startBuild');

let intervalId;

async function main() {
  try {
    await agentsPool.checkAgents();

    const [settings, buildsQueue, availableAgents] = await Promise.all([
      getSettings(),
      getWaitingBuilds(),
      agentsPool.getAvailableAgents(),
    ]);
    const { repoName, buildCommand } = settings;

    while (buildsQueue.length && availableAgents.length) {
      const isBuildStarted = await startBuild(
        availableAgents.pop(),
        buildsQueue[buildsQueue.length - 1],
        repoName,
        buildCommand
      );
      if (isBuildStarted) {
        buildsQueue.pop();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const start = (interval) => {
  intervalId = setInterval(main, interval);
};

const stop = () => {
  clearInterval(intervalId);
};

module.exports = {
  start,
  stop,
};
