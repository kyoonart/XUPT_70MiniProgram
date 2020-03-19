//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        lists: [],
        base: "https://xiaoyou.oubamall.com",
        contents: []
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo();
    },
    getInfo() {
        request({
            url: '/wxReq/activity?pageNum=1&pageSize=10',
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            let arr = res.rows
            arr = arr.map((item, index) => {
                let reg = /<[^<>]+>/g;
                return item.contents.replace(reg, '')
            })
            this.setData({
                lists: res.rows,
                contents: arr
            })
        })
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