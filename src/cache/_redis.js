/**
 * @description 连接 redis 的方法 get set
 * @author arkey
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', (err) => {
  console.log('redis error: ', err)
})

//set

//get

module.exports = {

}