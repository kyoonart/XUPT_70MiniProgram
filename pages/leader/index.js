//Page Object
Page({
    data: {
        lists: []
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        const baseUrl = "http://m2t9650514.qicp.vip";
        wx.request({
            url: baseUrl + '/wxReq/previousLeaders?pageNum=1&pageSize=10',
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let res = result.data.data.rows
                this.setData({
                    lists: res
                })
            },

        });
    }
});