/**
 * @description jest server
 * @author arkey
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)