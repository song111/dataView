import { observable, action, runInAction, toJS } from "mobx";
import { to } from 'src/utils'
import imagesApi from "src/api/images"
import { message } from 'antd'
import _ from 'lodash'

class Images {
    @observable dataLoading = false
    @observable imagesData = []
    @observable uploadLoading = false
    @observable pathName = '/images'
    @observable createDirModalVisible = false

    @action
    setCreateDirModalVisible(bool) {
        this.createDirModalVisible = bool
    }

    @action
    setPathName(pathName) {
        this.pathName = pathName
        this.queryImages(this.pathName)
    }

    // 获取目录
    @action
    async queryImages(pathName) {
        this.dataLoading = true
        let [err, res] = await to(imagesApi.queryImages(pathName))
        runInAction(() => {
            this.dataLoading = false
            if (err) { message.error('目录获取失败！'); return }
            if (res.data.data) {
                this.imagesData = res.data.data.map((item, i) => {
                    item.key = i
                    return item
                })
                this.imagesData.sort((fileA, fileB) => {  // 排序
                    let fileTypeA = fileA.fileType.toUpperCase().charCodeAt(0);
                    let fileTypeB = fileB.fileType.toUpperCase().charCodeAt(0);
                    if (fileTypeA < fileTypeB) {
                        return -1;
                    }
                    if (fileTypeA > fileTypeB) {
                        return 1;
                    }
                    return 0;
                })
            }
        })
    }

    // 图片上传
    @action
    uploadFile(data) {
        this.uploadLoading = true
        const { file } = data
        // 上传完成
        if (file.status === 'done') {
            this.uploadLoading = false
            message.success(file.name + '上传成功')
            this.queryImages(this.pathName)
            return
        }
        // 错误判断
        if (file.status === 'error') {
            this.uploadLoading = false
            message.error(file.name + '上传错误')
            return
        }
    }

    // 创建文件夹
    @action
    async createDir(params) {
        let [err, res] = await to(imagesApi.createDir(params))
        runInAction(() => {
            if (err) { message.error('文件夹创建失败！'); return }
            message.success('文件夹创建成功！')
            this.createDirModalVisible = false
            this.queryImages(this.pathName)
        })
    }

    // 删除文件夹

    // 删除图片
    @action
    async removeFile(pathName) {
        let [err, res] = await to(imagesApi.removeFile(pathName))
        runInAction(() => {
            if (err) { message.error('文件删除失败！'); return }
            message.success('文件删除成功！')
            this.queryImages(this.pathName)
        })
    }

    // 修改名称

    // 修改文件夹名称




}
export default Images;