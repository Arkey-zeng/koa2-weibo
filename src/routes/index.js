const router = require('koa-router')()
const { loginRedirect } = require('../middlewares/loginChecks')

router.get('/',loginRedirect,  async (ctx, next) => {
  await ctx.render('index', {
    blogData: {
      isEmpty: false,
      blogList: []
    },
    userData: {}
  })
})

module.exports = router
