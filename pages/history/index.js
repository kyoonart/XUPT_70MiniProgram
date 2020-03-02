//Page Object
Page({
    data: {
        content: '',
        imgUrl: ''
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        const baseUrl = "http://m2t9650514.qicp.vip";
        wx.request({
            url: baseUrl + '/wxReq/schoolHistory',
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let res = result.data.data
                this.setData({
                    content: res.contents,
                    imgUrl: baseUrl + res.imgUrl
                })
            },

        });
    }
});