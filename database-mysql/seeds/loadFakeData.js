const generateFakeData = require('./generateFakeData');
const mysql = require('../../database-mysql');

function generateUsers() {

  let users = [];

  for (let id = 1; id <= 100; id++) {

    let userdata = generateFakeData.User();

    mysql.insertIntoTable('user', userdata, (err, results) => {
      if (err) {
        console.log(' server issue ' + err);
      } else {
        console.log('inserted = ' + JSON.stringify(results));
      }
    });
  }
  return;
}

//generateUsers();

function generateItems() {

  let items = [];

  for (let id = 1; id <= 100; id++) {

    let data = generateFakeData.Item();

    mysql.insertIntoTable('item', data, (err, results) => {
      if (err) {
        console.log(' server issue ' + err);
      } else {
        console.log('inserted = ' + JSON.stringify(results));
      }
    });
  }
  return;
}

//generateItems();

function generateVendors() {

  let vendors = [];

  for (let id = 1; id <= 100; id++) {

    let data = generateFakeData.Vendor();

    mysql.insertIntoTable('vendor', data, (err, results) => {
      if (err) {
        console.log(' server issue ' + err);
      } else {
        console.log('inserted = ' + JSON.stringify(results));
      }
    });
  }
  return;
}

//generateVendors();

function generateItemAvail() {

  let itemAvail = [];

  for (let id = 1; id <= 100; id++) {

    let data = generateFakeData.ItemAvailability();

    mysql.insertIntoTable('item_availability', data, (err, results) => {
      if (err) {
        console.log(' server issue ' + err);
      } else {
        console.log('inserted = ' + JSON.stringify(results));
      }
    });
  }
  return;
}

generateItemAvail();