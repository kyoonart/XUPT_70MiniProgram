import { request } from '../../utils/request.js';
Page({
    data: {
        imgUrl: [],
        base: 'https://xiaoyou.oubamall.com'
    },
    onLoad: function() {
        this.getSwiperImgUrl()
    },
    handleChange() {
        wx.switchTab({
            url: '../seventy/index'
        });
    },
    getSwiperImgUrl() {
        request({
            url: '/wxReq/carousel',
            data: { pageNum: 1, pageSize: 10 },
            method: 'GET'
        }).then((res) => {
            this.setData({
                imgUrl: res.rows
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
                url: '../myAlumni/index',
                success: (result) => {},

            });
        }
    }
});