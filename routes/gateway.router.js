const express = require('express');

const GatewayService = require('../services/gateway.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createGatewaySchema, updateGatewaySchema, getGatewaySchema } = require('../schemas/gateway.schema');

const router = express.Router();
const service = new GatewayService();

router.get('/', async (req, res) => {
  const gateways = await service.find();
  res.json(gateways);
});

router.get('/filter', (req, res) => {
  res.send('I am a filter');
});


router.get('/:id',
  validatorHandler(getGatewaySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gateway = await service.findOne(id);
      res.json(gateway);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createGatewaySchema, 'body'),
  async (req, res , next) => {
    try {
      const body = req.body;
      const newGateway = await service.create(body);
      res.status(201).json(newGateway);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getGatewaySchema, 'params'),
  validatorHandler(updateGatewaySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const gateway = await service.update(id, body);
      res.json(gateway);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  validatorHandler(getGatewaySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
