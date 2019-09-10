module.exports = {
  setJSONBody: setJSONBody,
  getRandomId: getRandomId
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

function getRandomId(context, events, done) {
  context.vars['id'] = Math.ceil(Math.random() * 10000000);
  return done();
}