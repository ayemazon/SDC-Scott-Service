const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('error connecting to database ' + err);
  }
});


const insertIntoTable = function (tableName, data, cb) {
  var dataKeys = '';
  var dataValues = '';
  for (var prop in data) {
    if (dataKeys !== '') {
      dataKeys += ', ';
      dataValues += ', "';
    }
    if (dataValues === '') {
      dataValues += '"';
    }
    dataKeys += prop;
    dataValues += data[prop] + '"';
  }
  var queryString = 'INSERT INTO ' + tableName + ' (' + dataKeys + ') VALUES (' + dataValues + '); ';
  //console.log('' + queryString + ';');
  connection.query(queryString, (err, dbRes) => {
    if (err) {
      //console.log('mysql insertIntoTable error ' + err);
      cb(err, null);
    } else {
      cb(null, dbRes);
    }
  });
};


const getProductDataById = function (id, cb) {
  var dataObj = {};
  dataObj.id = id;

  var queryString = 'SELECT item_id, vendor_id, amz_holds_stock, ' +
    'quantity_available, price ' +
    ' FROM item_availability ' +
    ' WHERE ' + id + ' = item_id';
  //console.log('' + queryString + ';');
  connection.query(queryString, (err, dbRes) => {
    if (err) {
      console.log('MYSQL select by item_id error ' + err);
      cb(err, null);
    } else {
      if (!dbRes) {
        cb(null, {});
      } else {
        //console.log("dbRes 1 = " + JSON.stringify(dbRes));
        dataObj.vendor_id = dbRes[0].vendor_id;
        dataObj.price = dbRes[0].price;
        dataObj.amz_holds_stock = ((dbRes[0].amz_holds_stock == 0) ? false : true);
        dataObj.available_quantity = dbRes[0].quantity_available;
        dataObj.gift_wrap_available = true;
        dataObj.user_zip = "78726";

        queryString = 'SELECT tVendor.id, tVendor.name, tVendor.free_returns, tVendor.ships_on_saturday, ' +
          ' tVendor.ships_on_sunday, tVendor.ships_from_zipcode ' +
          ' FROM vendor as tVendor ' +
          ' WHERE tVendor.id = ' + dataObj.vendor_id;

        connection.query(queryString, (err, dbRes2) => {
          if (err) {
            console.log('mysql insertIntoTable error ' + err);
            cb(err, null);
          } else {
            if (!dbRes2) {
              cb(null, dataObj);
            } else {
              dataObj.sold_by = dbRes2[0].name;
              dataObj.fulfilled_by = ((dataObj.amz_holds_stock == true) ? "Amazon" : dbRes2[0].name);
              if (dbRes2[0].ships_on_sunday == 1 && dbRes2[0].ships_on_saturday == 1) {
                dataObj.expected_shipping = "One Day";
              }
              if (dbRes2[0].ships_on_sunday == 1 || dbRes2[0].ships_on_saturday == 1) {
                dataObj.expected_shipping = "Two Days";
              }
              if (dbRes2[0].ships_on_sunday != 1 && dbRes2[0].ships_on_saturday != 1) {
                dataObj.expected_shipping = "4-5 Days";
              }
              dataObj.free_delivery = ((dbRes2[0].free_returns == 1) ? true : false);

              //console.log("dataObj = " + JSON.stringify(dataObj));

              cb(null, dataObj);
            }
          }
        });
      }
    }
  });
};

module.exports = {
  insertIntoTable: insertIntoTable,
  getProductDataById: getProductDataById
};