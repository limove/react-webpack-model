import fetch from "isomorphic-fetch";
import getMockDate from "./mockDate";

const rootUrl = "";



// 默认值
const defaultOption = {
    headers: {
        "Accept": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
};

let _commonFetch = (url, rType, params, fetchOption) => {
    let newOption = deepAssign({}, defaultOption, fetchOption);
    rType = rType.toLowerCase();
    newOption.method = rType;
    
    if (rType == "get") {
        url = formatUrl(url, params);
    } else {
        newOptions.body = JSON.stringify(params);
    }

    return fetch(rootUrl + url, newOption);
}

/**
 * 请求方法
 * @param {String} url 接口地址
 * @param {String} rType 请求方法类型['Get', 'Post', 'Delete', ...]
 * @param {Object} [params = {}] 请求参数
 * @param {Object} [fetchOption] 请求设置
 */
let fetchData = (url, rType, params = {}, fetchOption) => {
    if (window.REQUESTTYPE == "mock") {
        return new Promise((resolve, reject) => {
            let data = getMockDate(url);
            resolve(data);
        });
    } else {
        return _commonFetch(url, rType, params, fetchOption).then((response) => {
            return response.json();
        });
    }
}

module.exports = fetchData;
