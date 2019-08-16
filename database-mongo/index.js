const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amazon', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () {
  console.log('Database connection open');
})

module.exports.connection = db;