import http from '../http'

class Api_images {
    constructor() { }

    //图片文件查询
    qyeryImages(pathName) {
        let path = '';
        if (pathName.includes('/images')) {
            path = pathName.replace('/images', '')
        }
        return http.get('/images' + path)
    }
}

export default new Api_images()