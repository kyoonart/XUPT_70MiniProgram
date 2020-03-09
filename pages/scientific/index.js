//Page Object
Page({
    data: {
        lists: [],
        base: "http://m2t9650514.qicp.vip"
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo(options.id);

    },
    handleChange() {
        wx.redirectTo({
            url: '../comment/index'
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
                console.log(res.id);
                this.setData({
                    lists: res,
                })


            },
        });
    }
});