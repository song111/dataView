const Router = require("koa-router");
const DB = require("../db/db");

const router = new Router()

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
        fieldMap: params.fieldMap,
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

module.exports = router