/**
 * @description 个人首页 controller
 * @author arkey
 */

const { getBlogListByUser } = require('../services/blog')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length == 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}