module.exports = {
  connectionLimit: 50,
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.database
};