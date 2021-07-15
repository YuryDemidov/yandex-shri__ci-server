const express = require('express');
const server = require('./server');
const config = require('../server-conf.json');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/', router);

app.use(errorHandler);

app.listen(config.port, () => {
  server.start(config.updateInterval);
  console.log(`Build-server started at port ${config.port}...`);
});
