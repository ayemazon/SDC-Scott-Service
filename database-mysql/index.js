const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('error connecting to database ' + err);
  }
});

//------------ CRUD ----------//
const createRecord = function (tableName, data, cb) {
  var queryString = `INSERT INTO ${tableName} SET ?`;
  connection.query(queryString, [data], (err, dbRes) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, dbRes);
    }
  });
};

const updateRecord = function (tableName, data, id, cb) {
  var queryString = `UPDATE ${tableName} SET ? WHERE id = ${id}`;
  connection.query(queryString, [data], (err, dbRes) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, dbRes);
    }
  });
}

const deleteRecord = function (tableName, id, cb) {
  var queryString = `DELETE FROM ${tableName} WHERE id = ?`;
  console.log(queryString);
  connection.query(queryString, [id], (err, dbRes) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, dbRes);
    }
  });
}

//----------------------------//

const getProductDataById = function (id, cb) {

  var queryString = `SELECT itemAvail.item_id, itemAvail.vendor_id, itemAvail.amz_holds_stock, itemAvail.quantity_available, itemAvail.price, 
  vendor.id, vendor.name, vendor.free_returns, vendor.ships_on_saturday, vendor.ships_on_sunday, vendor.ships_from_zipcode
  FROM items_vendors AS itemAvail 
  INNER JOIN vendor
  WHERE itemAvail.item_id = ${id} AND vendor.id = itemAvail.vendor_id`;

  connection.query(queryString, (err, dbRes) => {
    if (err) {
      console.log('MYSQL select by item_id error ' + err);
      cb(err, null);
    } else if (dbRes.length) {
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
    }
    cb(null, dbRes);

  });
};

module.exports = {
  createRecord: createRecord,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
  getProductDataById: getProductDataById
};