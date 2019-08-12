const crud = require('./index.js');

crud.insertIntoTable('item', {name: 'Scott Peterson'}, (err, results) => {
  if (err) {
    console.log('INSERT CRUD ERROR: ', err);
  } else {
    console.log('RESULTS: ' ,results)
  }
})