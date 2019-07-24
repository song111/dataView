import { observable, action, runInAction, toJS } from "mobx";
import { to, generateUUID } from 'src/utils'
import sourceApi from "src/api/source"
import { message } from 'antd'
import _ from 'lodash'

class Source {
    @observable dataLoading = false
    @observable isDrawerVisible = false
    @observable activeSourceId = ''
    @observable activeSourceName = ''
    @observable sourceList = [] // 数据源列表
    @observable sourceTotal = 0 // 数据源总数
    @observable queryParams = {
        searchKey: "",
        pageNum: 1,
        pageSize: 10
    }
    @observable isAddSourceModalVisible = false
    @observable activeSourceDetail = {} // 数据源详情


    @action
    setAddSourceModalVisible(bool) {
        this.isAddSourceModalVisible = bool
    }

    @action
    setDrawerVisible(bool) {
        this.isDrawerVisible = bool
    }

    @action
    setActiveSourceDetail(id) {
        const detail = _.find(this.sourceList, { id })
        this.activeSourceDetail = _.cloneDeep(detail)
    }

    @action
    async querySources() {
        this.dataLoading = true
        const [err, result] = await to(sourceApi.querySources(toJS(this.queryParams)))
        runInAction(() => {
            this.dataLoading = false;
            if (err || result.err) { return }
            if (result.data.success && result.data.data) {
                this.sourceList = result.data.data.map((item, index) => {
                    item.key = index
                    return item
                })
                this.sourceTotal = result.data.total
            }
        })
    }

    // 改变搜索
    @action
    changeQuery(params) {
        this.queryParams = Object.assign({}, this.queryParams, params)
        this.querySources()
    }

    @action
    async getSourceById(id, name) {
        this.isDrawerVisible = true
        this.activeSourceId = id
        this.activeSourceName = name
        const [err, result] = await to(sourceApi.getSourceById(id))
        runInAction(() => {
            if (err || result.err) { return }
            if (result.data.success && result.data.data) {
                this.sourceDetail = result.data.data.content
            }
        })
    }

    @action
    async deleteSourceById(id) {
        const [err, result] = await to(sourceApi.deleteSourceById(id))
        runInAction(() => {
            if (err || result.err) { return }
            if (result.data.success) {
                this.querySources()
            }
        })
    }

    @action
    async addSource(data) {
        const newSource = Object.assign({},
            {
                id: generateUUID(),
                content: {
                    fieldMap: [],
                    data: []
                }
            }, data)
        const [err, result] = await to(sourceApi.addSource(newSource))
        runInAction(() => {
            if (err || result.err) { message.error("数据源添加失败！"); return }
            if (result.data.success) {
                message.success("数据源添加成功！")
                this.isAddSourceModalVisible = false
                this.querySources()
            }
        })
    }

    @action
    async updateSource(id, data, cb) {
        const [err, result] = await to(sourceApi.updateSource(id, data))
        runInAction(() => {
            if (err || result.err) { message.error("数据源更新失败！"); return }
            if (result.data.success) {
                message.success("数据源更新成功！")
                this.isAddSourceModalVisible = false
                this.querySources()
                this.isDrawerVisible = false
                cb && cb()
            }
        })
    }
}

export default Source;