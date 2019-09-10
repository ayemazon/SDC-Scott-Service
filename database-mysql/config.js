const setup = require('../env/setup.js');

module.exports = {
  connectionLimit: 30,
  host: setup.host,
  user: setup.user,
  password: setup.password,
  database: setup.database
};