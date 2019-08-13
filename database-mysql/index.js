const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('error connecting to database ' + err);
  }
});

//------------ CRUD ----------//
const insertIntoTable = function (tableName, data, cb) {
  var queryString = `INSERT INTO ${tableName} SET ?`;
  console.log(queryString);
  connection.query(queryString, [data], (err, dbRes) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, dbRes);
    }
  });
};

//----------------------------//

const getProductDataById = function (id, cb) {
  // var dbRes = {};
  // dbRes.id = id;

  var queryString = `SELECT itemAvail.item_id, itemAvail.vendor_id, itemAvail.amz_holds_stock, itemAvail.quantity_available, itemAvail.price, 
  vendor.id, vendor.name, vendor.free_returns, vendor.ships_on_saturday, vendor.ships_on_sunday, vendor.ships_from_zipcode
  FROM item_availability AS itemAvail 
  INNER JOIN vendor
  WHERE vendor.id = ${id} AND itemAvail.vendor_id = ${id}`;

  connection.query(queryString, (err, dbRes) => {
    if (err) {
      console.log('MYSQL select by item_id error ' + err);
      cb(err, null);
    } else {
      dbRes = dbRes[0];
      dbRes.gift_wrap_available = true;
      dbRes.user_zip = "78726";


      dbRes.sold_by = dbRes.name;
      dbRes.fulfilled_by = ((dbRes.amz_holds_stock == true) ? "Amazon" : dbRes.name);
      if (dbRes.ships_on_sunday == 1 && dbRes.ships_on_saturday == 1) {
        dbRes.expected_shipping = "One Day";
      }
      if (dbRes.ships_on_sunday == 1 || dbRes.ships_on_saturday == 1) {
        dbRes.expected_shipping = "Two Days";
      }
      if (dbRes.ships_on_sunday != 1 && dbRes.ships_on_saturday != 1) {
        dbRes.expected_shipping = "4-5 Days";
      }
      dbRes.free_delivery = ((dbRes.free_returns == 1) ? true : false);

      cb(null, dbRes);
    }



  });
};

module.exports = {
  insertIntoTable: insertIntoTable,
  getProductDataById: getProductDataById
};