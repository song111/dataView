const path = require('path')
const fs = require('fs')
const Router = require("koa-router");
const fileType = require('file-type');

const router = new Router()
const imagesPath = path.resolve(__dirname, '../../images')

fs.readdir(imagesPath, (err, files) => {
    console.log(files)
    files.forEach((item, i) => {
        fs.stat(imagesPath + '/' + files[i], (err, stats) => {
            if (stats.isFile()) {
                fs.readFile(imagesPath + '/' + files[i], (err, file) => {
                    console.log(fileType(file))
                })
            }
            console.log(stats, stats.isDirectory())
        })
    })
})

router.get('/images', async ctx => {   // 获取images 文件夹下的文件夹和图片
    let msg, isSuccess, data;
    try {
        let result = await fs.readdir(imagesPath)
        console.log(result)
        data = result
        isSuccess = true;
        msg = "获取数据成功!";
    } catch (err) {
        isSuccess = false;
        msg = "获取数据失败!";
    }


    // 接口返回结果
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };

})

module.exports = router