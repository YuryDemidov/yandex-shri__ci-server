const https = require('https');

const axios = require('axios');
const { apiToken, apiBaseUrl } = require('../../server-conf.json');

module.exports = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: apiToken,
  },
});
