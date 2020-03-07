//Page Object
Page({
    data: {
        lists: [],
        base: "http://m2t9650514.qicp.vip"
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo();
    },
    getInfo() {
        const baseUrl = "http://m2t9650514.qicp.vip";
        wx.request({
            url: baseUrl + '/wxReq/activity?pageNum=1&pageSize=10',
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let res = result.data.data.rows;
                this.setData({
                    lists: res,

                })


            },
        });
    },
    handleVer() {
        let verifyStatus = wx.getStorageSync('verifyStatus');
        if (verifyStatus == 0) {
            wx.showToast({
                title: '请您先进行校友验证',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: false,
                success: (result) => {

                },

            });
        } else {
            wx.navigateTo({
                url: "../sendInterActive/index",
                success: (result) => {},

            });

        }
    }
});