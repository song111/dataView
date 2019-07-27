import http from '../http'

class Api_images {
    constructor() { }

    //图片文件查询
    qyeryImages(pathName) {
        return http.get('/images/files?pathName=' + pathName)
    }
}

export default new Api_images()