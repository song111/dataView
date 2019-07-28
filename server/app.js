const Koa = require('koa');
const path = require('path')
const koaStatic = require('koa-static');
const koaBodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const sourceRouter = require('./src/routes/source')
const imagesRouter = require('./src/routes/images')

const app = new Koa()
const staticPath = './static'

app.use(koaBodyParser())

// 图片上传
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
        multipart: true // 是否支持 multipart-formdate 的表单
    }
}));

// 静态文件
app.use(koaStatic(path.resolve(__dirname, staticPath)))

// 路由
app.use(sourceRouter.routes(), sourceRouter.allowedMethods())
app.use(imagesRouter.routes(),imagesRouter.allowedMethods())

app.listen(3003, () => {
    console.log('服务运行在localhost:3003 ...')
})