const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'amazon';
const client = new MongoClient(url);
const id = 10;


client.connect(function (err, client) {
  if (err) cb(err);
  console.log('Connection to MongoDB successful');

  const db = client.db(dbName);
  const collection1 = db.collection('items_vendors');
 

  collection1.find({
    item_id: id
  }).sort({
    price: 1
  }).limit(1).toArray(function (err, vItemsDocs) {
    if (err) console.log(err);
      console.log(vItemsDocs)
      client.close();
    })
  });