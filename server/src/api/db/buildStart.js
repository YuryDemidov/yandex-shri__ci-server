const axios = require('../../utils/axiosInstance');

module.exports = async function buildStart(buildId, dateTime) {
  const response = await axios.post('/build/start', { buildId, dateTime });
  return response.data.data;
};
