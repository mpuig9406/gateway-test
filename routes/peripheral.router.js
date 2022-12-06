const express = require('express');

const PeripheralService = require('../services/peripheral.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPeripheralSchema, updatePeripheralSchema, getPeripheralSchema } = require('../schemas/peripheral.schema');

const router = express.Router();
const service = new PeripheralService();

router.get('/', async (req, res) => {
  const peripherals = await service.find();
  res.json(peripherals);
});

router.get('/filter', (req, res) => {
  res.send('I am a filter');
});

router.get('/gateway/:id',
  //validatorHandler(getGatewaySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const peripherals = await service.findByGatewayId(id);
      res.json(peripherals);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getPeripheralSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const peripheral = await service.findOne(id);
      res.json(peripheral);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPeripheralSchema, 'body'),
  async (req, res , next) => {
    try {
      const body = req.body;
      const newPeripherals = await service.create(body);
      res.status(201).json(newPeripherals);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getPeripheralSchema, 'params'),
  validatorHandler(updatePeripheralSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const peripheral = await service.update(id, body);
      res.json(peripheral);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  validatorHandler(getPeripheralSchema, 'params'),
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
