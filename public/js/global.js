/**
 * 接口请求环境
 * mock为模拟数据请求,不访问真实服务器接口
 * truth为真实数据请求,访问真实服务器接口
 * 请根据开发阶段自行选择调用模式
 */
let REQUESTTYPE = "mock";
// let REQUESTTYPE = "truth";

/**
 * 获取数据类型
 * @param {*} data 
 * @return {String}
 */
function getTypeofData(data) {
    let reg = /(?<=\[object\s)[a-zA-Z]+(?=\])/g;
    let sTypeArr = Object.prototype.toString.apply(data).match(reg);
    return sTypeArr.length > 0 ? sTypeArr[0] : "";
}

/**
 * 深克隆
 * @param {*} obj 
 */
function deepClone(obj) {
    var _tmp, result;
    _tmp = JSON.stringify(obj);
    result = JSON.parse(_tmp);
    return result;
}

function _deepAssignArray(target, data) {
    let sType = getTypeofData(data);
    switch (sType) {
        case "Array":
            target.push(...deepClone(data));
            break;
        case "Object":
            target.push(deepClone(data));
            break;
        default:
            target.push(data);
    }
}

function _deepAssignObject(target, data) {
    let sType = getTypeofData(data);
    switch (sType) {
        case "Array":
        case "Object":
            let keys = Object.keys(data);
            keys.forEach(key => {
                let typeOfValue = getTypeofData(data[key]);
                if (typeOfValue == "Array" || typeOfValue == "Object") {
                    target[key] = deepClone(data[key]);
                } else {
                    target[key] = data[key];
                }
            });
            break;
        default:
            throw new Error(`cannot assign ${sType} to Object`);
    }
}

function _deepAssign(target, data) {
    let sType = getTypeofData(target);
    switch (sType) {
        case "Array":
            _deepAssignArray(target, data);
            break;
        case "Object":
            _deepAssignObject(target, data);
            break;
        default:
            throw new Error(`cannot assign to ${sType}`);
    }
}

/**
 * 深克隆合并
 */
function deepAssign() {
    if (arguments.length <= 0) return;
    if (arguments.length == 1) return arguments[0]; 
    let args = Array.prototype.slice.call(arguments);
    for(let i = 1, len = args.length; i < len; i++) {
        _deepAssign(args[0], args[i]);
    }
    return args[0];
}

/**
 * 格式化url的数据
 * @param {String} url 
 * @param {Object} parameters 
 */
function formatUrl(url, parameters) {
    let paraString = '';

    for (let key in parameters) {
        let value = parameters[key];
        if (typeof value === 'object' || Array.isArray(value)) {
            value = JSON.stringify(value);
        }

        let item = key + '=' + value;
        if (paraString.length == 0) {
            paraString = paraString + item;
        } else {
            paraString = paraString + '&' + item;
        }
    }
    if (paraString.length != 0) {
        url = url + '?' + paraString;
    }
    return url;
}
