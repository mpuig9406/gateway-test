const express = require('express');

const gatewaysRouter = require('./gateway.router');
const peripheralRouter = require('./peripheral.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/gateways', gatewaysRouter);
  router.use('/peripherals', peripheralRouter);
}

module.exports = routerApi;
