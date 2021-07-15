const axios = require('../utils/axiosInstance');

const pool = [];

const getAgent = (host, port) => pool.find((agent) => `${agent.host}:${agent.port}` === `${host}:${port}`);

const getAgentByBuildId = (id) => pool.find((agent) => agent.buildId === id);

const getAvailableAgents = () => pool.filter((agent) => !agent.buildId);

const removeAgent = (host, port) => {
  const index = pool.findIndex((agent) => `${agent.host}:${agent.port}` === `${host}:${port}`);
  if (index >= 0) {
    pool.splice(index, 1);
  }
};

const registerAgent = (host, port) => {
  const agent = getAgent(host, port);
  if (agent) {
    throw new Error(`Agent ${host}:${port} already registered.`);
  }
  pool.push({ host, port, buildId: null });
};

const checkAgents = async () =>
  Promise.all(
    pool.map(async (agent) => {
      try {
        await axios.get(`http://${agent.host}:${agent.port}`);
      } catch (error) {
        removeAgent(agent.host, agent.port);
        console.log(
          `Could not establish connection with the agent ${agent.host}:${agent.port}. The agent will be removed from the pool`
        );
      }
    })
  );

const freeAgent = (buildId) => {
  const agent = getAgentByBuildId(buildId);
  if (agent) {
    agent.buildId = null;
  }
};

module.exports = {
  getAgent,
  checkAgents,
  registerAgent,
  removeAgent,
  getAvailableAgents,
  freeAgent,
};
