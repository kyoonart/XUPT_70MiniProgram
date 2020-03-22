const app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        inShool: true,
        fullName: '',
        studentId: 0,
        type: 0
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
        var verifyStatus = wx.getStorageSync('verifyStatus')
        console.log(verifyStatus);
        if (verifyStatus == 1) {
            wx.showToast({
                title: '您已验证无需重复验证',
                icon: '',
                image: '',
                duration: 3000,
                mask: true,
                success: (result) => {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500)
                },
                fail: () => {},
                complete: () => {}
            });

        }
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
                // console.log(res.userInfo);

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
    handleBack() {
        wx.switchTab({
            url: '../home/index'
        })
    },
    // bindChange() {
    formSubmit: function(e) {
        const {
            fullName,
            studentId
        } = e.detail.value;
        const type = e.detail.target.dataset.type;
        this.Login(fullName, studentId, type)
    },
    formSubmit2: function(e) {
        const {
            fullName,
            studentId
        } = e.detail.value;
        const type = e.detail.target.dataset.type;
        this.Login(fullName, studentId, type)
    },
    Login(fullName, studentId, type) {
        wx.login({
            success: (res) => {
                const baseUrl = "https://xiaoyou.oubamall.com";
                wx.getUserInfo({
                    success: function(res) {
                        type = Number(type)
                        console.log(typeof type)
                        console.log(res)
                        console.log(wx.getStorageSync('openid'))
                        wx.request({
                            url: baseUrl + `/wxReq/alumniVerification`,
                            data: {
                                type: type,
                                fullName: fullName,
                                studentId: studentId,
                                openid: wx.getStorageSync('openid'),
                            },
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                token: wx.getStorageSync('token')
                            },
                            method: 'POST',
                            success: (res) => {
                                console.log(res)
                                if (res.data.code === 200) {
                                    wx.setStorageSync('data', res.data.data);
                                    wx.setStorageSync('verifyStatus', res.data.data.verifyStatus)
                                    wx.showLoading({
                                        title: '正在验证中',
                                        mask: true,
                                        success: (result) => {
                                            wx.switchTab({
                                                url: '../home/index',
                                            });
                                        },

                                    });
                                } else {
                                    wx.showToast({
                                        title: '验证失败',
                                        icon: 'none',
                                        duration: 2000,
                                        mask: false,
                                        success: (result) => {},
                                    });
                                }
                            },
                        });
                    }
                })
            },
        });
    },
    // },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})