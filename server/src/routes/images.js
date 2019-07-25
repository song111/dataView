const path = require('path')
const fs = require('fs')
const fileType = require('file-type');
const { promisify } = require('util')
const { to } = require('../utils/index')

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const imageExt = ['jpg', 'png', 'jpeg', 'gif']

const imagesPath = path.resolve(__dirname, '../../')

const imagesRouter = async (ctx, next) => {   // 获取images 文件夹下的文件夹和图片
    let msg, isSuccess, data = [];
    const urlObj = ctx.URL
    const pathNameStr = decodeURI(urlObj['pathname'])
    if (!pathNameStr.includes('/images')) { await next(); return }
    console.log(pathNameStr)

    let [err, stat] = await to(statAsync(imagesPath + pathNameStr))    // 文件夹是否存在和是不是文件夹
    if (err) {
        msg = `${imagesPath + pathNameStr} 文件目录不存在`
        isSuccess = false
    } else {
        if (stat.isDirectory()) {
            let [err, files] = await to(readdirAsync(imagesPath + pathNameStr))
            console.log(files)
            for (let fileName of files) {
                let [err, stat] = await to(statAsync(imagesPath + pathNameStr + '/' + fileName))
                if (err) {
                    msg = `${imagesPath + pathNameStr + '/' + fileName} 文件目录不存在`
                    isSuccess = false
                } else {
                    msg = "获取文件目录成功"
                    isSuccess = true
                    if (stat.isDirectory()) {
                        data.push({
                            fileName: fileName,
                            pathName: pathNameStr + '/' + fileName,
                            size: stat.size,
                            createTime: stat.birthtime,
                            modifyTime: stat.mtime,
                            fileType: 'dir'
                        })
                    } else {
                        let [err, file] = await to(readFileAsync(imagesPath + pathNameStr + '/' + fileName))
                        if (err) {
                            msg = `${imagesPath + pathNameStr + '/' + fileName} 文件读取报错！`
                            isSuccess = false
                        } else {
                            if (imageExt.includes(fileType(file).ext)) {
                                data.push({
                                    fileName: fileName,
                                    pathName: pathNameStr + '/' + fileName,
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
    // 接口返回结果
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
}

module.exports = imagesRouter