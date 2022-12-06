const faker = require('faker');
const assert = require('assert');

const peripherals = [];
var error_handler = false;

  function generate() {
    const limit = 11;
    const gateway_id = faker.datatype.uuid();

    for (let index = 0; index < limit; index++) {
      create({
        id: faker.datatype.uuid(),
        devices: faker.commerce.product(),
        vendor: faker.company.bs(),
        date: faker.date.soon(),
        status: faker.datatype.boolean(),
        gateway_id: gateway_id
      });
    }
  };

  function create(data) {
    const newPeripheral = {
      id: faker.datatype.uuid(),
      date: new Date().toISOString(),
      ...data
    }
    const exist = peripherals.filter(item => item.gateway_id === data.gateway_id);
    if(exist && exist.length >= 10) {
        error_handler = true;  
    }
    peripherals.push(newPeripheral);
    
  }


describe('BasicTest', function() {

    describe('asd', () => {

        it("add more than ten devices with equal gateway ip", () => {
            //Try add 11 devices with equal gateway, if error_handler var is true signal that the test is successful
            // if error_handler is false signal that the test is failed and the sistema is failed;
            
            // Function to generate random 11 devices
            generate();

            //get the error_handler var and comproube if error_handler var is true
            var result = error_handler;
            assert.equal(result, true);
        })
    });


});