
/**
 *  await 结果包装：错误和结果一起返回，避免使用try catch
 * @param promise  一个axios请求
 * */
function to(promise) {
    return promise
        .then(data => {
            return [null, data]
        })
        .catch(err => [err, null])
}


module.exports={
    to
}
