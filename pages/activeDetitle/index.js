// pages/newsDetail/index.js
import { request } from '../../utils/request'
Page({
    data: {
        id: 0,
        base: 'https://xiaoyou.oubamall.com',
        commentNums: 0,
        createTime: 0,
        likeNums: 0,
        imgUrl: '',
        activityTitle: '',
        introduction: '',
        contents: '0',
        status: 0,
        url2: '../../image/icon/goodA.png',
        url1: '../../image/icon/good.png'
    },
    onLoad: function(options) {
        this.data.id = options.id;
        this.getNewsContent(this.data.id)
        this.handlelikeStart(options.id)
    },
    handleToComment() {
        console.log(this.data.id);
        wx.navigateTo({
            url: `../comment/index?id=${this.data.id}&type=2`,
            success: (result) => {
                console.log(result);
            },
        })
    },
    getNewsContent(id) {
        request({
            url: `/wxReq/activity/${id}`,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            let reg = /<[^<>]+>/g;
            let arr = res.contents.replace(reg, '')
            this.setData({
                commentNums: res.commentNums,
                likeNums: res.likeNums,
                contents: arr,
                imgUrl: res.imgUrl,
                activityTitle: res.activityTitle,
                createTime: res.createTime
            })
        })
    },
    handlelikeStart() {
        let userId = wx.getStorageSync('userId')
        request({
            url: '/wxReq/like',
            method: 'POST',
            data: {
                topicType: 2,
                topicId: this.data.id,
                userId: userId,
            },
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            this.setData({
                status: res.status
            });
            this.getNewsContent(this.data.id)
        })
    },

    onReady: function() {

    },

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

    }
})