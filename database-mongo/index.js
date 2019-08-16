const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amazon', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.on('open', function () {
//   console.log('Database connection open');
// })
// db.close();

module.exports.connection = db;