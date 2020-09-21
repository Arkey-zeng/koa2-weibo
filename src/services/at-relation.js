/**
 * @description 微博 @ 用户关系 service
 * @author arkey
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博 id 
 * @param {number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
  const result = AtRelation.create({
    blogId,
    userId
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量（未读的）
 * @param {number} userId userId
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取 @ 用户的微博列表
 * @param {*} param0 查询条件 { userId, pageIndex, pageSize = 10 }
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      // @ 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      // user
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  // result.count
  // result.rows

  // 格式化
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
}