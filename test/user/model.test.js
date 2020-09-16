/**
 * @description urer model demo
 * @author arkey
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: 'p123',
    nickName: '张三',
    picture: '/xxx.png',
    city: '深圳'
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('p123')
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('深圳')
  expect(user.gender).toBe(3) // 测试 gender 默认值
})