const crud = require('./index.js');

// TESTS FOR CRUD FUNCTIONS //

// crud.createRecord('item', {name: 'Scott Peterson'}, (err, results) => {
//   if (err) {
//     console.log('INSERT CRUD ERROR: ', err);
//   } else {
//     console.log('RESULTS: ' ,results)
//   }
// })

// crud.updateRecord('vendor', {name: 'Dork Jorkins'}, 100, (err, results) => {
//   if (err) {
//     console.log('UPDATE CRUD ERROR: ', err);
//   } else {
//     console.log('RESULTS: ' ,results)
//   }
// })

// crud.deleteRecord('item', 102, (err, results) => {
//   if (err) {
//     console.log('DELETE CRUD ERROR: ', err);
//   } else {
//     console.log('RESULTS: ' ,results)
//   }
// })

// SELECT itemAvail.item_id, itemAvail.vendor_id, itemAvail.amz_holds_stock, itemAvail.quantity_available, itemAvail.price, 
//   vendor.id, vendor.name, vendor.free_returns, vendor.ships_on_saturday, vendor.ships_on_sunday, vendor.ships_from_zipcode
//   FROM items_vendors AS itemAvail 
//   INNER JOIN vendor
//   WHERE itemAvail.item_id = 199999 AND vendor.id = itemAvail.vendor_id;