//Page Object
Page({
    data: {
        lists: [],
        base: "http://m2t9650514.qicp.vip",
        content: '',
        inputVal: ''
    },
    //options(Object)
    onLoad: function(options) {
        console.log(options);
        wx.setStorageSync('options', options);
        this.getInfo(options.id, options.type);
    },
    handleSend(e) {
        let content = e.detail.value.content;
        let { id, type } = wx.getStorageSync('options');
        let data = wx.getStorageSync('data');
        wx.request({
            url: this.base + '/wxReq/comment',
            data: {
                "topicType": type,
                "topicId": id,
                "userId": data.userId,
                "contents": content
            },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                this.setData({
                    inputVal: ''
                });
                this.getInfo(id, type)
            },
        });
    },
    getInfo(id, type) {
        wx.request({
            url: this.data.base + `/wxReq/comment/${id}/${type}?pageNum=1&pageSize=10`,
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let res = result.data.data.rows;
                this.setData({
                    lists: res
                })
            },
        });
    }
});