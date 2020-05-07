import { request } from '../../utils/request.js';
Page({
    data: {
        imgUrl: ['https://s1.ax1x.com/2020/05/07/YmkSX9.png', 'https://s1.ax1x.com/2020/05/07/YmkM7t.png'],
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
            wx.showModal({
                content: '请您先进行校友验证',
                showCancel: false,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#014a95',
                success: (result) => {
                    if (result.confirm) {}
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