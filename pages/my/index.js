const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        inShool: true
    },
    //事件处理函数
    bindAcountTap: function() {
        let verifyStatus = wx.getStorageSync('verifyStatus');
        if (verifyStatus == 0) {
            wx.showModal({
                content: '请您在首页进行校友验证',
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
                url: '../accountInformation/index',
            })
        }

    },
    bindBasicTap: function() {
        let verifyStatus = wx.getStorageSync('verifyStatus');
        if (verifyStatus == 0) {
            wx.showModal({
                content: '请您在首页进行校友验证',
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
                url: '../basicInformation/index',
            })
        }

    },
    bindCallTap: function() {
        let verifyStatus = wx.getStorageSync('verifyStatus');
        if (verifyStatus == 0) {
            wx.showModal({
                content: '请您在首页进行验证',
                showCancel: false,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#014a95',
                success: (result) => {
                    if (result.confirm) {}
                },
                fail: () => {},
                complete: () => {}
            });
        } else {
            wx.navigateTo({
                url: '../callInformation/index',
            })
        }

    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
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
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})