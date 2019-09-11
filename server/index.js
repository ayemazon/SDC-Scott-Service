require('newrelic');
const cluster = require('cluster');


if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  })
} else {
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require("path");
  const cors = require("cors");
  const db = require('../database-mysql');
  const morgan = require('morgan');

  const app = express();
  const PORT = 3030;

  // app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  
  const clientDistFolder = path.join(__dirname, '/../client/dist');
  const publicFolder = path.join(__dirname, '/..', '/public');
    
  app.use(express.static(publicFolder));
  app.use(express.static(clientDistFolder, {maxAge: '30000', setHeaders: function (res) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/x-gzip')
  }}));
  app.use('/:id', express.static(publicFolder, {maxAge: '30000'}));
  app.use('/:id', express.static(clientDistFolder, {maxAge: '30000', setHeaders: function (res) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/x-gzip')
  }}));

  app.use('/static', express.static(publicFolder, {maxAge: '30000'}));

  
  app.get('/product/pricing/:id', (req, res) => {  
    db.getProductDataById(req.params.id, (err, results) => {
      if (err) {
        console.log('GET error');
        res.status(400).json(err);
      } else {
        res.set({'Cache-Control': 'max-age=30000'}).status(200).json(results);
      }
    });
  });
  
  app.post('/', (req, res) => {
    db.createRecord(req.body.table, req.body.data, (err, results) => {
      if (err) {
        console.log('POST error');
        res.status(400).send(err);
      } else {
        res.status(200).json(results)
      }
    });
  });
  
  app.put('/', (req, res) => {
    db.updateRecord(req.body.table, req.body.data, req.body.id, (err, results) => {
      if (err) {
        console.log('PUT error');
        res.status(400).send(err);
      } else {
        res.status(200).json(results)
      }
    });
  });
  
  app.delete('/', (req, res) => {
    let id = req.body.id;
    let table = req.body.table;
    db.deleteRecord(req.body.table, req.body.id, (err, results) => {
      if (err) {
        console.log('PUT error');
        res.status(400).send(err);
      } else {
        res.status(200).json(results)
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log(`visit http://localhost:${PORT}`);
  });
  
}
