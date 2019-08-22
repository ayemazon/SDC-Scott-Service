const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");
const db = require('../database-mongo/index.js');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const clientDistFolder = path.join(__dirname, '/..', '/client/dist');
const publicFolder = path.join(__dirname, '/..', '/public');

console.log('clientDistFolder = ' + clientDistFolder + ', publicFolder = ' + publicFolder);

app.use(express.static(clientDistFolder));
app.use('/static', express.static(publicFolder));
app.use('/:id', express.static(clientDistFolder));

app.get('/product/:id', (req, res) => {
  var requestedId = req.params.id;

  db.getProductDataById(requestedId, (err, results) => {
    if (err) {
      console.log('GET error');
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/', (req, res) => {
  let collectionString = req.body.collection;
  let data = req.body.data;
  db.createDocument(collectionString, data, (err, results) => {
    if (err) {
      console.log('POST error');
      res.status(500).send(err);
    } else {
      res.status(200).json(results)
    }
  });
});

app.listen(PORT, () => {
  console.log(`visit http://localhost:${PORT}`);
});