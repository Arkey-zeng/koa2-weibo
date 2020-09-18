/**
 * @description 用户关系 controller
 * @author arkey
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')

/**
 * 根据 userId 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)

  // 返回
  return new SuccessModel({
    count,
    fansList: userList
  })
}

module.exports = {
  getFans
}