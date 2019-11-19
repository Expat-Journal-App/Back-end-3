const knex = require('knex')
const env = require('../config').env
const knexConfig = require('../knexfile.js')

module.exports = knex(knexConfig[env])