module.exports = {
  setJSONBody: setJSONBody
}

const faker = require('faker');

function setJSONBody(requestParams, context, ee, next) {
  requestParams.json = {
    'table': 'item',
    'data': {
      'name': `${faker.commerce.productAdjective()} ${faker.commerce.color()} ${faker.commerce.productName()}`
    }
  };
  next();
}