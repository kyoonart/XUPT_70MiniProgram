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
    inShoolBind: function() {
        if (this.data.inShool === false) {
            this.setData({
                inShool: !this.data.inShool
            })
        }
    },
    unShoolBind: function() {
        console.log(this.data.inShool)
        if (this.data.inShool === true) {
            this.setData({
                inShool: !this.data.inShool
            })
        }
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShow() {
        this.getOpenid()
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            console.log(app.globalData.userInfo);
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log(res.userInfo);

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
                    console.log(res.userInfo);
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getOpenid() {
        wx.login({
            timeout: 10000,
            success: (result) => {
                let code = result.code;
                console.log(code);

            },
        });
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})