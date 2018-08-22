let mockdata = {};
function refreshMock() {
    mockdata = {
        //示例:数据同步
        "/park/syncSpaceData": Mock.mock({
            "data": "同步成功",
            "success": true
        })
    };
}

/**
 * 获取mock数据
 * @param {(String|RegExp)} url 
 * @return {Object} 返回第一个匹配的数据
 */
function getMockDate(url) {
    refreshMock();
    let keys = Object.keys(mockdata);
    if (typeof url == 'string') url = new RegExp(`^${url}$`);
    let results = keys.filter(key => url.test(key))
        .map(key => mockdata[key]);
    let result = results.length > 0 ? results[0] : { message: 'no mock data' };
    return result;
}

module.exports = getMockDate;