/**
 * @description 个人首页 controller
 * @author arkey
 */

const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取广场页微博列表
 * @param {number} pageIndex 当前页面
 */
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList({
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
  getSquareBlogList
}