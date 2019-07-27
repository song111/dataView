
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


export function dateFormat(date, fmt) {
    let o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}  