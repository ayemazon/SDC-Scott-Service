require('newrelic');
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 3000});


  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require("path");
  const cors = require("cors");
  const db = require('../database-mysql');
  const app = express();
  const PORT = 8000;

  app.use(cors());
  app.use(bodyParser.json());
  
  const clientDistFolder = path.join(__dirname, '/../client/dist');
  const publicFolder = path.join(__dirname, '/..', '/public');
    
  app.use(express.static(publicFolder, {maxAge: '30000'}));
  app.use('/:id', express.static(publicFolder, {maxAge: '30000'}));
  

  app.use('/static', express.static(publicFolder, {maxAge: '30000'}));

  
  app.get('/product/pricing/:id', (req, res) => {  
    // Server Cache
    myCache.get(req.params.id, (err, value) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        if (value == undefined) { // Fetch from db
          db.getProductDataById(req.params.id, (err, results) => {
            if (err) {
              console.log('GET error');
              res.status(400).json(err);
            } else {
              myCache.set(req.params.id, results, (err, success) => { // Store value in cache
                res.set({'Cache-Control': 'max-age=30000'}).status(200).json(results);
              })
            }
          });
        } else {
          res.set({'Cache-Control': 'max-age=30000'}).status(200).json(value);
        }
      }
    })
  });
  
  app.post('/product', (req, res) => {
    db.createRecord(req.body.table, req.body.data, (err, results) => {
      if (err) {
        console.log('POST error');
        res.status(400).send(err);
      } else {
        res.status(200).json(results)
      }
    });
  });

  // * Special verification get route for loader.io  * //

  app.get('/loaderio-8cf1c24260c897494f0386efd121a377', (req, res) => {
    let filename = 'loaderio-8cf1c24260c897494f0386efd121a377.txt';
    res.sendFile(filename, {root: '~/'}, (err) => {
      if (err) {
        console.log('cannot find file with given path');
        next(err);
      }
    })
  })

  //* ---------------------------------------------- *//
  
  // app.put('/', (req, res) => {
  //   db.updateRecord(req.body.table, req.body.data, req.body.id, (err, results) => {
  //     if (err) {
  //       console.log('PUT error');
  //       res.status(400).send(err);
  //     } else {
  //       res.status(200).json(results)
  //     }
  //   });
  // });
  
  // app.delete('/', (req, res) => {
  //   let id = req.body.id;
  //   let table = req.body.table;
  //   db.deleteRecord(req.body.table, req.body.id, (err, results) => {
  //     if (err) {
  //       console.log('PUT error');
  //       res.status(400).send(err);
  //     } else {
  //       res.status(200).json(results)
  //     }
  //   });
  // });
  
  app.listen(PORT, () => {
    console.log(`visit http://ec2-18-191-179-191.us-east-2.compute.amazonaws.com:${PORT}`);
  });

