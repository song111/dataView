import http from '../http'

class Api_images {
    constructor() {
        // 上传文件的接口
        this.updateExcelUrl = '/images/upload'
    }

    //图片文件查询
    queryImages(pathName) {
        return http.get('/images/files?pathName=' + pathName)
    }

    /** 新建文件夹 
     * params
     *  @param String params.pathName  // 新建路径
     * @param String params.dirName  // 新建文件夹名称
    */
    createDir(params) {
        return http.post('/images/createDir', params)
    }

    /** 删除文件夹
     * params
     *  @param String params.pathName  // 文件夹路径
    */
    removeDir(pathName) {
        return http.delete('/images/removeDir?pathName=' + pathName)
    }

    /** 删除文件
     * params
     *  @param String params.pathName  // 文件路径
    */
    removeFile(pathName) {
        return http.delete('/images/removeFile?pathName=' + pathName)
    }

    /** 获取图片base64 数据
    * params
    *  @param String params.pathName  // 文件路径
   */
    getImageBase64(pathName) {
        return http.get('/images/base64?pathName=' + pathName)
    }
}

export default new Api_images()