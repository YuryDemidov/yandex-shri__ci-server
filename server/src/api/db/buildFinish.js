const axios = require('../../utils/axiosInstance');

module.exports = async function buildFinish(buildId, duration, success, buildLog) {
  const response = await axios.post('/build/finish', { buildId, duration, success, buildLog });
  return response.data.data;
};
