// pages/cecall/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pics: [], //图片
    },

  bindClick(e){
    wx.showToast({
      title: '发布成功，等待后台审核',
      icon: 'none',
      duration: 2000,
      mask: false,
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 图片放大查看
     */
    previewImg: function(e) {

        var index = e.target.dataset.index; //当前图片地址
        var imgArr = e.target.dataset.list; //所有要预览的图片的地址集合 数组形式
        console.log(index, imgArr)
        wx.previewImage({
            current: imgArr[index],
            urls: imgArr,
        })
    },
    /**
     * 图片上传
     * 
     */

    //上传图片开始
    chooseImg: function(e) {
        var that = this,
            pics = this.data.pics;
        console.log(pics);
        if (pics.length < 3) {
            wx.chooseImage({
                count: 3, // 最多可以选择的图片张数，默认9
                sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
                sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
                success: function(res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;
                    // wx.showToast({
                    //   title: '正在上传...',
                    //   icon: 'loading',
                    //   mask: true,
                    //   duration: 10000
                    // });
                    for (var i = 0; i < tempFilePaths.length; i++) {
                        pics.push(tempFilePaths[i]);
                    }
                    console.log(pics);
                    that.setData({
                        pics: pics
                    })
                },
            });
        } else {
            wx.showToast({
                title: '最多上传3张图片',
                icon: 'none',
                duration: 3000
            });

        }
    },
    // 删除图片
    deleteImg: function(e) {
        var that = this;
        var pics = this.data.pics;
        var index = e.currentTarget.dataset.index;
        pics.splice(index, 1);
        console.log(pics)
        this.setData({
            pics: pics,
        })
    },
    // 预览图片
    previewImg1: function(e) {
        //获取当前图片的下标
        var index = e.currentTarget.dataset.index;
        //所有图片
        var pics = this.data.pics;
        wx.previewImage({
            //当前显示图片
            current: pics[index],
            //所有图片
            urls: pics
        })
    },


})