const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amazon', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
  .on('open', () => console.log('MongoDB now open'))


module.exports = db;