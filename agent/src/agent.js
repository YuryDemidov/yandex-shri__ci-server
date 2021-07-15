const { maxRetries, retryTimeout } = require('../agent-conf.json');
const execCommand = require('./utils/execCommand');
const sendResultsToServer = require('./api/sendResult');
const notifyServer = require('./api/notifyServer');

let isAgentBusy = false;
let resendTimeout = null;
let sendRetries = 0;
let intervalId;

const isBusy = () => isAgentBusy;

const startBuild = async (buildId, repoUrl, commitHash, buildCommand) => {
  isAgentBusy = true;
  const start = Date.now();
  let result;
  try {
    const command = [`git clone ${repoUrl} repo`, `cd repo`, `git checkout ${commitHash}`, `npm ci`, buildCommand].join(
      ' && '
    );
    result = await execCommand(command);
  } catch (error) {
    result = {
      code: 1,
      log: error.message || error,
    };
  } finally {
    sendRetries = 0;
    isAgentBusy = false;
    const duration = Math.round((Date.now() - start) / 1000 / 60);
    sendResult(buildId, duration, result.code === 0, result.log);
  }
};

const sendResult = async (id, duration, status, log) => {
  try {
    await sendResultsToServer(id, duration, status, log);
    resendTimeout = null;
  } catch (error) {
    console.log(`Sending results of build ${id} failed`);

    if (sendRetries < maxRetries) {
      resendTimeout = setTimeout(() => sendResult(id, duration, status, log), retryTimeout);
      sendRetries++;
    }
  }
};

const start = (interval) => {
  notifyServer();
  intervalId = setInterval(() => {
    if (!isBusy) {
      notifyServer();
    }
  }, interval);
};

const stop = () => {
  clearInterval(intervalId);
};

module.exports = {
  isBusy,
  startBuild,
  sendResult,
  start,
  stop,
};
