'use strict'
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"/"',
  API_ENDPOINT: '"http://localhost:5000/api/v1"'
})
