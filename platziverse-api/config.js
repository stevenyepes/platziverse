'use strict'

const debug = require('debug')('platziverse:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'jsteven',
    password: process.env.DB_PASS || 'jsteven',
    host: process.env.DB_HOST || 'db',
    dialect: 'postgres',
    logging: s => debug(s)
  }
}
