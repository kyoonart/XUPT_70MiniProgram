let ajaxTimes = 0;
export const request = (params) => {
    let header = {...params.header };
    header["token"] = wx.getStorageSync('token');
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    // 定义公共的url
    const baseUrl = "https://xiaoyou.oubamall.com";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.data);
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