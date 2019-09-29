const Router = require("koa-router");
const path = require('path')
const fs = require('fs')
const fileType = require('file-type');
const { promisify } = require('util')
const { to } = require('../utils/index')
const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const mkdirAsync = promisify(fs.mkdir)
const renameAsync = promisify(fs.rename)
const unlinkAsync = promisify(fs.unlink)
const imageExt = ['jpg', 'png', 'jpeg', 'gif']
const imagesPath = path.resolve(__dirname, '../../')

const router = new Router()
// 根目录查询
router.get('/images/files', async (ctx) => {
    let msg, isSuccess, data = [];
    const { pathName } = ctx.query
    let [err, stat] = await to(statAsync(imagesPath + pathName))    // 文件夹是否存在和是不是文件夹
    if (err) {
        msg = `${imagesPath + pathName} 文件目录不存在`
        isSuccess = false
    } else {
        if (stat.isDirectory()) {
            let [err, files] = await to(readdirAsync(imagesPath + pathName))
            for (let fileName of files) {
                let [err, stat] = await to(statAsync(imagesPath + pathName + '/' + fileName))
                if (err) {
                    msg = `${imagesPath + pathName + '/' + fileName} 文件目录不存在`
                    isSuccess = false
                } else {
                    msg = "获取文件目录成功"
                    isSuccess = true
                    if (stat.isDirectory()) {
                        data.push({
                            fileName: fileName,
                            pathName: pathName + '/' + fileName,
                            size: stat.size,
                            createTime: stat.birthtime,
                            modifyTime: stat.mtime,
                            fileType: 'dir'
                        })
                    } else {
                        let [err, file] = await to(readFileAsync(imagesPath + pathName + '/' + fileName))
                        if (err) {
                            msg = `${imagesPath + pathName + '/' + fileName} 文件读取报错！`
                            isSuccess = false
                        } else {
                            if (imageExt.includes(fileType(file).ext)) {
                                data.push({
                                    fileName: fileName,
                                    pathName: pathName + '/' + fileName,
                                    size: stat.size,
                                    createTime: stat.birthtime,
                                    modifyTime: stat.mtime,
                                    fileType: 'img'
                                })
                            }
                        }
                    }
                }
            }
        }
    }
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})

// 查看图片

// 上传图片
router.post('/images/upload', ctx => {
    let msg, isSuccess, data = null;
    const params = ctx.request.body;
    const { pathName } = params
    const file = ctx.request.files.file;
    const url = imagesPath + pathName + '/' + file.name
    try {
        const fileReader = fs.createReadStream(file.path);
        const writeStream = fs.createWriteStream(url);  // 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
        fileReader.pipe(writeStream);
        isSuccess = true
        msg = '上传成功'
    } catch (err) {
        isSuccess = false
        msg = '上传失败'
    }

    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})

router.get('/images/base64', ctx => {
    let msg, isSuccess, data
    const { pathName } = ctx.query
    const url = imagesPath + pathName
    if (fs.existsSync(url)) {
        const extname = path.extname(url)
        const fileData = fs.readFileSync(url, { encoding: 'base64' })
        data = `data:image/${extname};base64,${fileData}`;
        isSuccess = true
        msg = '获取数据成功'
    } else {
        isSuccess = false
        msg = '路径不存在'
    }
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})


// 新建文件夹
router.post('/images/createDir', async ctx => {
    let msg, isSuccess, data = null;
    const params = ctx.request.body;
    const { pathName, dirName } = params
    const url = imagesPath + pathName + '/' + dirName
    const [err, result] = await to(mkdirAsync(url))
    if (err) {
        msg = `创建文件夹失败！`
        isSuccess = false
    } else {
        msg = `创建文件夹成功！`
        isSuccess = true
        data = result
    }

    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})



// 删除文件
router.delete('/images/removeFile', async ctx => {
    let msg, isSuccess, data = null;
    const { pathName } = ctx.query
    const url = imagesPath + pathName

    if (fs.existsSync(url)) {
        const [err, result] = await to(unlinkAsync(url))
        if (err) {
            msg = `文件删除失败！`
            isSuccess = false
        } else {
            msg = `文件删除成功！`
            isSuccess = true
        }
    } else {
        msg = `文件不存在！`
        isSuccess = false
    }

    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})

// 删除文件夹
router.delete('/images/removeDir', async ctx => {
    let msg, isSuccess, data = null;
    const { pathName } = ctx.query
    const url = imagesPath + pathName
    if (fs.existsSync(url)) {
        try {
            deleteDir(url)
            msg = `文件删除成功！`
            isSuccess = true
        } catch (err) {
            msg = `文件删除失败！`
            isSuccess = false
        }
    } else {
        msg = `文件夹不存在！`
        isSuccess = false
    }

    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})

// 修改文件夹名称

// 修改文件名称


// 函数
function deleteDir(url) {
    let files = [];
    if (fs.existsSync(url)) {  //判断给定的路径是否存在
        files = fs.readdirSync(url);   //返回文件和子目录的数组
        files.forEach(function (file, index) {
            let curPath = path.join(url, file);
            if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteDir(curPath);
            } else {
                fs.unlinkSync(curPath);    //是指定文件，则删除
            }
        });
        fs.rmdirSync(url); //清除文件夹
    } else {
        console.log("给定的路径不存在！");
    }
}


module.exports = router