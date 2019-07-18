const Koa = require('koa');
const path = require('path')
const koaStatic = require('koa-static');
const koaBodyParser = require('koa-bodyparser')
const sourceRouter = require('./src/routes/source')

const app = new Koa()
const staticPath = './static'
app.use(koaBodyParser())

app.use(async (ctx, next) => {
    console.log(ctx.URL)
    await next()
})

// 静态文件
app.use(koaStatic(path.resolve(__dirname, staticPath)))
app.use(sourceRouter.routes(),sourceRouter.allowedMethods())
// app.use(router.routes());   /*启动路由*/
// app.use(router.allowedMethods());
app.listen(3003, () => {
    console.log('服务运行在localhost:3003 ...')
})