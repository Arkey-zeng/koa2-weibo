const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    blogData: {
      isEmpty: false,
      blogList: []
    },
    userData: {}
  })
})

module.exports = router
