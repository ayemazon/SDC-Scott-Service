const db = require('./index.js');
const fs = require('fs');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment-reworked');
const Schema = mongoose.Schema;

db.connection.on('open', function () {
  console.log('Database connection open');
})

// TODO - build out db collections and insert test docs
// use fast-csv for streaming fakeData to be inserted into mongo
// use simple test cases
// ? reformat file for csv or use formatter from fast-csv
// load several hundred documents
// load 10M


var itemsSchema = new Schema({
  name: String
});

itemsSchema.plugin(AutoIncrement.MongooseAutoIncrementID.plugin, {
  modelName: 'Items'
});


var vendorsSchema = new Schema({
  _id: Number,
  name: String,
  amz_holds_stock: Boolean,
  free_returns: Boolean,
  ships_on_saturday: Boolean,
  ships_on_sunday: Boolean,
  ships_from_zipcode: String,
  status: String
});

var items_vendorsSchema = new Schema({
  item_id: Number,
  vendor_id: Number,
  items_condition: String,
  price: Number,
  quantity_available: Number,
  amz_holds_stock: Boolean,
  free_returns: Boolean,
  ships_from_zipcode: String
})
var Item = mongoose.model('Items', itemsSchema);
var Vendor = mongoose.model('Vendors', vendorsSchema);
var Items_vendor = mongoose.model('Items_Vendors', items_vendorsSchema);


// fs.createReadStream('database-mysql/fake-data/mongo_test.txt', {
//     emitClose: true
//   })
//   .pipe(csv.parse({
//     headers: true,
//     delimiter: '\t'
//   }))
//   .on('data', row => console.log(row))
//   .on('end', () => db.connection.close());

Item.create([{
  name: 'test_item1'
}, {
  name: 'test_item2'
}], function (err) {
  if (err) console.log('***Error in saving Item document to db!*** ', err);
})

// Vendor.insertMany([{
//   _id: 1,
//   name: 'Vendor1',
//   amz_holds_stock: 1,
//   free_returns: 0,
//   ships_on_saturday: 1,
//   ships_on_sunday: 0,
//   ships_from_zipcode: '92692',
//   status: 'Acceptable'

// }, {
//   _id: 2,
//   name: 'Vendor2',
//   amz_holds_stock: 1,
//   free_returns: 1,
//   ships_on_saturday: 1,
//   ships_on_sunday: 0,
//   ships_from_zipcode: '92692',
//   status: 'Good'

// }], function (err) {
//   if (err) console.log('***Error in saving Vendor document to db!*** ', err);
// })

// Items_vendor.insertMany([{
//   item_id: 1,
//   vendor_id: 2,
//   items_condition: 'Good',
//   price: 89.99,
//   quantity_available: 3,
//   amz_holds_stock: 1,
//   free_returns: 1,
//   ships_from_zipcode: '92692'
// }, {
//   item_id: 2,
//   vendor_id: 2,
//   items_condition: 'Good',
//   price: 89.99,
//   quantity_available: 3,
//   amz_holds_stock: 1,
//   free_returns: 1,
//   ships_from_zipcode: '92692'
// }], function (err) {
//   if (err) console.log('***Error in saving Items_vendors document to db!*** ', err);
//   db.connection.close();
// })