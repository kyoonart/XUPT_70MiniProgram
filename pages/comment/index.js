//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        lists: [],
        base: "https://xiaoyou.oubamall.com",
        content: '',
        inputVal: ''
    },
    onLoad: function(options) {
        console.log(options);
        wx.setStorageSync('options', options);
        this.getInfo(options.id, options.type);
    },
    formName(e) {
        console.log(e.detail.value);
        this.setData({
            content: e.detail.value
        })
    },
    handleSend(e) {
        console.log(e)
        console.log(this.data.inputVal)
        let {
            id,
            type
        } = wx.getStorageSync('options');
        let data = wx.getStorageSync('userId');
        console.log(type, id, data, this.data.content)
        request({
            url: '/wxReq/comment',
            data: {
                "topicType": type,
                "topicId": id,
                "userId": Number(data),
                "contents": this.data.content
            },
            method: 'POST',
        }).then((res) => {
            wx.showToast({
                title: '提交评论成功，等待审核',
                icon: 'none',
                duration: 3000,
                mask: false,
                success: (result) => {},
            });
            this.setData({
                inputVal: ''
            });
            this.getInfo(id, type)
        })
    },
    getInfo(id, type) {
        request({
            url: `/wxReq/comment/${id}/${type}?pageNum=1&pageSize=10`,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            this.setData({
                lists: res.rows
            })
        }).catch(res => {
            // console.log(res);
        })
    }
});