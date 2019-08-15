const faker = require('faker');
const fs = require('fs');

const randomNumber = function (max, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}
const vendorStatus = ['Active', 'Pending Approval', 'Discontinued'];
const itemCondition = ['New', 'Used - Like New', 'Used - Very Good', 'Used - Good', 'Used - Acceptable'];

/* Functions that create fake data for database tables */
let createItems = function (qty) {
  let writeStream = fs.createWriteStream(__dirname + '/fake-data/items.txt');
  for (let i = 0; i < qty; i++) {
    writeStream.write(`${faker.commerce.productAdjective()} ${faker.commerce.color()} ${faker.commerce.productName()}\n`);
  }
  writeStream.end();
}

let createVendors = function (qty) {
  let writeStream = fs.createWriteStream(__dirname + '/fake-data/vendors.txt');
  for (let i = 0; i < qty; i++) {
    writeStream.write(`${faker.company.companyName()}\t${randomNumber(1)}\t${randomNumber(1)}\t${randomNumber(1)}\t${randomNumber(1)}\t${faker.address.zipCode()}\t${vendorStatus[randomNumber(2)]}\n`);
  }
  writeStream.end();
}

let createAvailableItems = function (qty) {
  let writeStream = fs.createWriteStream(__dirname + '/fake-data/items_vendors.txt', {
    'flags': 'a' // Allows for two 5Million record batches to be appended to same file
  });
  for (let i = 0; i < qty; i++) {
    writeStream.write(`${randomNumber(200000, 1)}\t${randomNumber(100000, 1)}\t${itemCondition[randomNumber(4)]}\t${faker.commerce.price()}\t${randomNumber(1000)}\t${randomNumber(1)}\t${randomNumber(1)}\t${faker.address.zipCode()}\n`);
  }
  writeStream.end();
}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* Generate fake data and store in a text file for loading */

// TODO - Depending on your computer's memory, you may have to run the following separately. 5M records will need to be run twice, or you will need modify the quantity

// createItems(200000);
// createVendors(100000);
createAvailableItems(5000000); // Run twice or modify