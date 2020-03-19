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
        const baseUrl = "https://xiaoyou.oubamall.com";
        wx.login({
            timeout: 10000,
            success: (res) => {
                let code = res.code
                wx.getUserInfo({
                    success: function(res) {
                        let userInfo = JSON.stringify(res.userInfo);
                        wx.request({
                            url: baseUrl + `/wxLogin`,
                            data: {
                                code: code,
                                rawData: userInfo
                            },
                            header: { 'content-type': 'application/x-www-form-urlencoded' },
                            method: 'POST',
                            dataType: 'json',
                            responseType: 'text',
                            success: (result) => {
                                console.log(result);
                                let token = result.data.data.token;
                                let openId = result.data.data.userInfo.openid
                                let verifyStatus = result.data.data.userInfo.verifyStatus
                                let userId = result.data.data.userInfo.userId
                                wx.setStorageSync('token', token)
                                wx.setStorageSync('openid', openId)
                                wx.setStorageSync('verifyStatus', verifyStatus)
                                wx.setStorageSync('userId', userId)
                                wx.switchTab({
                                    url: '../home/index',
                                });
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