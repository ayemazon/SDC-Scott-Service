const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const dbName = 'amazon';
const client = new MongoClient(url);




const getProductDataById = function (id, cb) {

  client.connect(function (err, client) {
    if (err) cb(err);
    console.log('Connection to MongoDB successful');

    const db = client.db(dbName);
    const collection1 = db.collection('items_vendors');
    const collection2 = db.collection('vendors');
    let queryResults = {};

    collection1.find({
        item_id: Number(id)
      })
      .sort({
        price: 1
      })
      .limit(1)
      .toArray(function (err, vItemsDocs) {
        if (err) {
          cb(err, vItemsDocs);
        } else if (vItemsDocs && vItemsDocs.length) {
          let vendorId = vItemsDocs[0].vendor_id;
          queryResults = vItemsDocs[0];

          collection2.find({
              _id: vendorId
            })
            .toArray(function (err, [vendorDoc]) {
              if (err) cb(err);

              if (vendorDoc) {
                queryResults.ships_on_saturday = vendorDoc.ships_on_saturday;
                queryResults.ships_on_sunday = vendorDoc.ships_on_sunday;
                queryResults.status = vendorDoc.status;
                queryResults.sold_by = vendorDoc.name
              }
              cb(err, queryResults);
            })
        } else {
          cb(err, queryResults)
        }
      });
  })
}

const createDocument = function (collectionString, data, cb) {
  client.connect(function (err, client) {
    if (err) cb(err)
    console.log('Connection to MongoDB successful');

    const db = client.db(dbName);
    const collection = db.collection(collectionString);

    collection
      .find({})
      .sort({
        _id: -1
      })
      .limit(1)
      .toArray(function (err, [result]) {
        data._id = result._id + 1;
        collection.insertOne(data, function (err, results) {
          if (err) cb(err, results);
          cb(err, results);
        })

      })

  })
}


module.exports = {
  getProductDataById: getProductDataById,
  createDocument: createDocument
};