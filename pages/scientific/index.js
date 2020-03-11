//Page Object
Page({
    data: {
        lists: [],
        base: "http://m2t9650514.qicp.vip",
        Id: 0
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo(options.id);
    },
    handleToComment() {
        wx.redirectTo({
            url: `../comment/index?id=${this.data.Id}&type=3`
        })
    },
    getInfo(id) {
        const baseUrl = "http://m2t9650514.qicp.vip";
        wx.request({
            url: baseUrl + `/wxReq/project/${id}`,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let res = result.data.data;
                console.log(res);
                this.setData({
                    lists: res,
                    Id: res.id
                })


            },
        });
    }
});