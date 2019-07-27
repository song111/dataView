
/**
 *  await 结果包装：错误和结果一起返回，避免使用try catch
 * @param promise  一个axios请求
 * */
export function to(promise) {
    return promise
        .then(data => {
            return [null, data]
        })
        .catch(err => [err, null])
}


/**
 *  生成唯一id
 * */
export function generateUUID() {
    let d = new Date().getTime();
    let uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uuid;
}

// searchparams 解析
export function parseUrl(url) {
    let result = {};
    const query = url.split("?")[1];
    if (query) {
        const queryArr = query.split("&");
        queryArr.forEach(function (item) {
            let value = item.split("=")[1];
            let key = item.split("=")[0];
            result[key] = value;
        });
    }
    return result;
}
