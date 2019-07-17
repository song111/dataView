const Koa = require('koa');
const path = require('path')
const Router = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const staticPath = './static'
app.use(bodyParser())

app.use(async (ctx, next) => {
  console.log(ctx.URL)
  await next()
})

app.use(static(path.resolve(__dirname, staticPath)))
app.listen(3003, () => {
  console.log('服务运行在localhost:3003 ...')
})