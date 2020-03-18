//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        lists: [],
        base: "https://xiaoyou.oubamall.com",
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
        request({
            url: `/wxReq/project/${id}`,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            this.setData({
                lists: res,
                Id: res.id
            })
        })
    }
});