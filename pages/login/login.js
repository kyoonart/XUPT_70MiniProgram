const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    // bindChange() {
    //     wx.switchTab({
    //         url: '../home/index',
    //     });
    // },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    bindChange() {
        const baseUrl = "http://m2t9650514.qicp.vip";
        wx.login({
            timeout: 10000,
            success: (result) => {
                let code = result.code;
                wx.getUserInfo({
                    success: function(res) {
                        let userInfo = JSON.stringify(res.userInfo);
                        wx.request({
                            url: baseUrl + `/wxLogin?code=${code}&rawData=${userInfo}`,
                            data: {},
                            header: { 'content-type': 'application/json' },
                            method: 'POST',
                            dataType: 'json',
                            responseType: 'text',
                            success: (result) => {
                                console.log(result);
                            },
                        });
                    }
                })
            },
        });
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})