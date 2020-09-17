/**
 * @description urer api test
 * @author arkey
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储 cookie
let COOKIE = ''

// 注册
test('注册一个用户，应该成功', async () => {
  const ret = await server
    .post('/api/user/register')
    .send(testUser)
  expect(ret.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户，应该失败', async () => {
  const ret = await server
    .post('/api/user/register')
    .send(testUser)
  expect(ret.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册用户名，应该存在', async () => {
  const ret = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(ret.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async () => {
  const ret = await server
    .post('/api/user/register')
    .send({
      userName: '123',
      password: 'q',
      gender: 'mail'
    })
  expect(ret.body.errno).not.toBe(0)
})

// 登录
test('登录，应该成功', async () => {
  const ret = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  expect(ret.body.errno).toBe(0)

  // 获取 cookie
  COOKIE = ret.headers['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息应该成功', async () => {
  const ret = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '测试昵称',
      city: '测试城市',
      picture: '/test.png'
    })
    .set('cookie', COOKIE)
  expect(ret.body.errno).toBe(0)
})

// 修改密码
test('修改密码应该成功', async () => {
  const ret = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `p_${Date.now()}`
    })
    .set('cookie', COOKIE)
  expect(ret.body.errno).toBe(0)
})

// 删除
test('删除用户，应该成功', async () => {
  const ret = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(ret.body.errno).toBe(0)
})

// 退出
test('退出登录应该成功', async () => {
  const ret = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(ret.body.errno).toBe(0)
})

// 再次查询用户，应该不存在
test('删除之后，再次查询注册用户，应该不存在', async () => {
  const ret = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(ret.body.errno).not.toBe(0)
})