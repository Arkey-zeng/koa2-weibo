/**
 * @description user view 路由
 * @author arkey
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  await ctx.render('404', {})
})

module.exports = router