let mockdata = {
    //示例:数据同步
    "/park/syncSpaceData": {
        "data": "同步成功",
        "success": true
    }
}

/**
 * 获取mock数据
 * @param {(String|RegExp)} url 
 * @return {Object} 返回第一个匹配的数据
 */
function getMockDate(url) {
    let keys = Object.keys(mockdata);
    if (typeof url == 'string') url = new RegExp(`^${url}$`);
    let results = keys.filter(key => url.test(key))
        .map(key => mockdata[key]);
    let result = results.length > 0
        ? Mock.mock(results[0]) 
        : { message: 'no mock data' };
    return result;
}

module.exports = getMockDate;