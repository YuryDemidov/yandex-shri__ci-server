const axios = require('axios');
const { serverHost, serverPort } = require('../../agent-conf.json');

module.exports = async (id, duration, status, log) => {
  await axios.post(`http://${serverHost}:${serverPort}/notify-build-result`, { id, duration, status, log });
};
