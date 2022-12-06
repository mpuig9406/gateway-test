const Joi = require('joi');

const id = Joi.string().uuid();
const devices = Joi.string().min(3).max(30);
const vendor = Joi.string().min(3).max(30);
const date = Joi.date();
const status = Joi.boolean();
const gateway_id = Joi.string().uuid();


const createPeripheralSchema = Joi.object({
  devices: devices.required(),
  vendor: vendor.required(),
  date : date,
  status: status,
  gateway_id: gateway_id.required()
});

const updatePeripheralSchema = Joi.object({
  devices: devices,
  vendor: vendor,
  date : date,
  status: status,
  gateway_id: gateway_id
});

const getPeripheralSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPeripheralSchema, updatePeripheralSchema, getPeripheralSchema }
