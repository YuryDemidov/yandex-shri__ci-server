const express = require('express');
const agent = require('./agent');
const config = require('../agent-conf.json');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/', router);

app.use(errorHandler);

app.listen(config.port, () => {
  agent.start(config.updateInterval);
  console.log(`Build-agent started at port ${config.port}...`);
});
