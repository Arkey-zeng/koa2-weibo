/**
 * @description 微博数据模型测试
 * @author arkey
 */

const { Blog } = require('../../src/db/model/index')

test('微博数据模型各个属性，符合预期', () => {
  const user = Blog.build({
    userId: 1,
    content: '微博内容',
    image: '/test.png'
  })
  expect(user.userId).toBe(1)
  expect(user.content).toBe('微博内容')
  expect(user.image).toBe('/test.png')
})