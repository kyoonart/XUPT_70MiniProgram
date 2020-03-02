let ajaxTimes = 0;
export const request = (params) => {
    let header = {...params.header };
    if (params.url.includes("/wxLogin/")) {
        header["Authorization"] = wx.getStorageSync("token");
    }
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    // 定义公共的url
    const baseUrl = "http://m2t9650514.qicp.vip";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}