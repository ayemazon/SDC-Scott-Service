const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const pool = mysql.createPool(mysqlConfig);

let connection = pool.getConnection((err, connection) => {
  if (err) {
    console.log('error connecting to database ' + err);
    throw err;
  }
  return connection;
});

//------------ CRUD ----------//
const createRecord = function (tableName, data, cb) {
  var queryString = `INSERT INTO ${tableName} SET ?`;
  pool.query(queryString, [data], (err, dbRes) => {
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
  WHERE itemAvail.item_id = ${id} AND vendor.id = itemAvail.vendor_id LIMIT 1`;

  pool.query(queryString, (err, dbRes) => {
    if (err) {
      console.log('MYSQL select by item_id error ' + err);
      cb(err, null);
    } else {
      dbRes = dbRes.length === 1 ? dbRes[0] : {};
      cb(null, dbRes);
    }

  });
};

module.exports = {
  createRecord: createRecord,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
  getProductDataById: getProductDataById
};