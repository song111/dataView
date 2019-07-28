const Router = require("koa-router");
const DB = require("../db/db");

const router = new Router()

// 获取数据源
router.get("/source/querySources", async ctx => {
    let msg, isSuccess, data, total;
    let query = {}; // 查询条件
    const params = ctx.request.query;
    // 分页搜索
    let pagination = {};
    if (params.pageNum && params.pageSize) {
        pagination = {
            page: params.pageNum,
            limit: params.pageSize
        }
    }
    // 搜索关键词
    if (params.searchKey) {
        query.name = new RegExp(params.searchKey, "i"); //匹配关键词
    }

    try {
        let totalResult = await DB.find("Source", query, {}, {});
        let result = await DB.find("Source", query, pagination, {});
        data = result;
        if (data) {
            isSuccess = true;
            msg = "获取数据成功!";
            total = totalResult.length;
        } else {
            isSuccess = false;
            msg = "获取数据失败!";
            total = 0;
        }
    } catch (e) {
        isSuccess = false;
        msg = "获取数据失败!";
        total = 0;
    }

    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data,
        total: total
    };
});


// 新增数据源
router.post('/source/addSource', async (ctx) => {
    let msg, isSuccess, data; // 接口返回信息
    const params = ctx.request.body;
    let newSource = {
        id: params.id,
        name: params.name,
        createDate: params.createDate ? params.createDate : new Date(),
        updateDate: params.updateDate ? params.updateDate : new Date(),
        description: params.description,
        content: params.content
    };

    try {
        let result = await DB.save("Source", newSource);
        data = result;
        isSuccess = true;
        msg = "添加数据成功!";
    } catch (e) {
        isSuccess = false;
        msg = "添加数据失败!";
    }
    // 接口返回结果
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})


// 获取数据源详情
router.get("/source/getSource/:id", async ctx => {
    let msg, isSuccess, data; // 接口返回信息
    const id = ctx.params.id;

    try {
        let result = await DB.findOne("Source", { id });
        data = result;
        if (data) {
            isSuccess = true;
            msg = "获取数据成功!";
        } else {
            isSuccess = false;
            msg = "获取数据失败!";
        }
    } catch (e) {
        isSuccess = false;
        msg = "获取数据失败!";
    }
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
})

// 数据源编辑
router.post("/source/updateSource/:id", async ctx => {
    let msg, isSuccess, data;
    const id = ctx.params.id
    const params = ctx.request.body;
    const updateData = {
        name: params.name,
        createDate: params.createDate,
        updateDate: new Date(),
        description: params.description,
        content: params.content
    }

    try {
        let result = await DB.update("Source", { id }, updateData);
        data = result;
        isSuccess = true;
        msg = "更新数据成功!";
    } catch (e) {
        isSuccess = false;
        msg = "更新数据失败!";
    }
    // 接口返回结果
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    }
})

// 删除数据源
router.post("/source/deleteSource/:id", async ctx => {
    let msg, isSuccess, data;
    const id = ctx.params.id

    try {
        let result = await DB.remove("Source", { id });
        data = result;
        isSuccess = true;
        msg = "删除数据成功!";
    } catch (e) {
        isSuccess = false;
        msg = "删除数据失败!";
    }
    // 接口返回结果
    ctx.body = {
        success: isSuccess,
        message: msg,
        data: data
    };
});


module.exports = router