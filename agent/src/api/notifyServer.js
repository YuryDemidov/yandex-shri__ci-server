const axios = require('axios');
const { port, serverHost, serverPort, agentHost } = require('../../agent-conf.json');

module.exports = async () => {
  const { data } = await axios.post(`http://${serverHost}:${serverPort}/notify-agent`, {
    hostname: agentHost,
    port,
  });
  return data;
};
