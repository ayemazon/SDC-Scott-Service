/*
! This config option is needed to increase the heap size for large data loads--> node --max-old-space-size=6114 yourFile.js

++++ import(seed) scripts ++++
* mongoimport --db amazon --collection items --columnsHaveTypes --type tsv --fields "_id.int32(),name.string()" --file 'database-mongo/fake-data/items.txt'

* mongoimport --db amazon --collection vendors --columnsHaveTypes --type tsv --fields "_id.int32(),name.string(),amz_holds_stock.boolean(),free_returns.boolean(),ships_on_saturday.boolean(),ships_on_sunday.boolean(),ships_from_zipcode.string(),status.string()" --file 'database-mongo/fake-data/vendors.txt'

* mongoimport --db amazon --collection items_vendors --columnsHaveTypes --type tsv --fields "item_id.int32(),vendor_id.int32(),items_condition.string(),price.string(),quantity_available.int32(),amz_holds_stock.boolean(),free_returns.boolean(),ships_from_zipcode.string()" --file 'database-mongo/fake-data/items_vendors.txt'

*/

const faker = require('faker');
const fs = require('fs');

const randomNumber = function (max, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}
const vendorStatus = ['Active', 'Pending Approval', 'Discontinued'];
const itemCondition = ['New', 'Used - Like New', 'Used - Very Good', 'Used - Good', 'Used - Acceptable'];

/* Functions that create fake data for database tables */
let createItems = function (qty) {
  let writeStream = fs.createWriteStream(__dirname + '/fake-data/items.txt', {
    'flags': 'a'
  });
  for (let i = 0; i < qty; i++) {
    writeStream.write(`${i+1}\t${faker.commerce.productAdjective()} ${faker.commerce.color()} ${faker.commerce.productName()}\n`);
  }
  writeStream.end();
}

let createVendors = function (qty) {
  let writeStream = fs.createWriteStream(__dirname + '/fake-data/vendors.txt');
  for (let i = 0; i < qty; i++) {
    writeStream.write(`${i+1}\t${faker.company.companyName()}\t${randomNumber(1)}\t${randomNumber(1)}\t${randomNumber(1)}\t${randomNumber(1)}\t${faker.address.zipCode()}\t${vendorStatus[randomNumber(2)]}\n`);
  }
  writeStream.end();
}

let createAvailableItems = function () {
  let writeStream = fs.createWriteStream(__dirname + '/fake-data/items_vendors.txt', {
    'flags': 'a' // Allows for two 5Million record batches to be appended to same file
  });

  // NOTE * You will need to uncomment one loop at a time and set the number of loops according to the number of records you want to generate.
  // If you try to run too many at once, you may run out of memory!

  for (let i = 0; i < 15000000; i++) {
    writeStream.write(`${randomNumber(10000000, 1)}\t${randomNumber(50000, 1)}\t${itemCondition[randomNumber(4)]}\t${faker.commerce.price()}\t${randomNumber(1000)}\t${randomNumber(1)}\t${randomNumber(1)}\t${faker.address.zipCode()}\n`);
  }

  writeStream.end();
}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* Generate fake data and store in a text file for loading */

// TODO - Depending on your computer's memory, you may have to run the following in separate batches. 5M records will need to be run x6 for 30M, or you will need modify the quantity

//createItems(10000000);
// createVendors(50000);
createAvailableItems();