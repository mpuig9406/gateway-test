const Joi = require('joi');

const id = Joi.string().uuid();
const serial = Joi.string().min(5).max(15);
const ip = Joi.string().ip();
const validated = Joi.boolean();

const createGatewaySchema = Joi.object({
  serial: serial.required(),
  ip: ip.required(),
  validated: validated,
});

const updateGatewaySchema = Joi.object({
  serial: serial,
  ip: ip,
  validated: validated
});

const getGatewaySchema = Joi.object({
  id: id.required(),
});

module.exports = { createGatewaySchema, updateGatewaySchema, getGatewaySchema }
