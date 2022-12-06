const faker = require('faker');
const boom = require('@hapi/boom');

class GatewayService {

  constructor(){
    this.gateways = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.gateways.push({
        id: faker.datatype.uuid(),
        serial: faker.random.alphaNumeric(15),
        ip: faker.internet.ip(),
        validated: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newGateways = {
      id: faker.datatype.uuid(),
      ...data
    }
    const exist = this.gateways.find(item => item.serial === data.serial) || this.gateways.find(item => item.ip === data.ip); 
    if(exist){
      throw boom.conflict('serial and ip do not repeat');  
    }
    this.gateways.push(newGateways);
    return newGateways;
  }

  find() {
    return new Promise((resolve) => {
        resolve(this.gateways);
    })
  }

  async findOne(id) {
    const gateway = this.gateways.find(item => item.id === id);
    if (!gateway) {
      throw boom.notFound('gateway not found');
    }
    if (!gateway.validated) {
      throw boom.conflict('gateway do not validated');
    }
    return gateway;
  }

  async update(id, changes) {
    const index = this.gateways.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('gateway not found');
    }
    const exist = this.gateways.find(item => item.serial === changes.serial && item.id != id) || this.gateways.find(item => item.ip === changes.ip && item.id != id); 
    if(exist ){
      throw boom.conflict('serial and ip do not repeat');  
    }
    const gateway = this.gateways[index];
    this.gateways[index] = {
      ...gateway,
      ...changes
    };
    return this.gateways[index];
  }

  async delete(id) {
    const index = this.gateways.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('gateway not found');
    }
    this.gateways.splice(index, 1);
    return { id };
  }

}

module.exports = GatewayService;
