import http from '../http'

class Api_source {
    constructor() { }

    // 查询文章
    querySources(data) {
        return http.get('/source/querySources', data)
    }

    // 获取数据源数据详情
    getSourceById(id) {
        return http.get(`/source/getSource/${id}`)
    }

    // 新增数据源
    addSource(data) {
        return http.post(`/source/addSource`, data)
    }

    // 更新数据源
    updateSource(id, data) {
        return http.post(`/source/updateSource/${id}`, data)
    }

    //  删除数据源
    deleteSourceById(id) {
        return http.post(`/source/deleteSource/${id}`)
    }

}

export default new Api_source()