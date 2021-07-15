const axios = require('../../utils/axiosInstance');

module.exports = async function getSettings() {
  const response = await axios.get('/conf');
  return response.data.data;
};
