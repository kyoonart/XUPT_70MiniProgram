Page({
    data: {

    },
    handleChange() {
        wx.switchTab({
            url: '../seventy/index'
        });
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