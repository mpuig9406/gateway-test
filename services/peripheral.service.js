const faker = require('faker');
const boom = require('@hapi/boom');
const { date } = require('joi');

class PeripheralService {

  constructor(){
    this.peripherals = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.peripherals.push({
        id: faker.datatype.uuid(),
        devices: faker.commerce.product(),
        vendor: faker.company.bs(),
        date: faker.date.soon(),
        status: faker.datatype.boolean(),
        gateway_id: faker.datatype.uuid(),
      });
    }
  }

  async create(data) {
    const newPeripheral = {
      id: faker.datatype.uuid(),
      date: new Date().toISOString(),
      ...data
    }
    const exist = this.peripherals.filter(item => item.gateway_id === data.gateway_id);
    if(exist && exist.length >= 10) {
      throw boom.conflict('that gateway have 10 devices connected');  
    }
    this.peripherals.push(newPeripheral);
    return newPeripheral;
  }

  find() {
    return new Promise((resolve) => {
        resolve(this.peripherals);
    })
  }

  async findOne(id) {
    const peripheral = this.peripherals.find(item => item.id === id);
    if (!peripheral) {
      throw boom.notFound('peripheral not found');
    }
    return peripheral;
  }

  findByGatewayId(id) {
    return new Promise((resolve) => {
        resolve(this.peripherals.filter(item => item.gateway_id === id));
    })
  }

  async update(id, changes) {
    const index = this.peripherals.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('gateway not found');
    }
    const exist = this.peripherals.filter(item => item.gateway_id === changes.gateway_id); 
    if(exist && exist.length >= 10) {
      throw boom.conflict('that gateway have 10 devices connected');  
    }
    const peripheral = this.peripherals[index];
    this.peripherals[index] = {
      ...peripheral,
      ...changes
    };
    return this.peripherals[index];
  }

  async delete(id) {
    const index = this.peripherals.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('peripheral not found');
    }
    this.peripherals.splice(index, 1);
    return { id };
  }

}

module.exports = PeripheralService;
