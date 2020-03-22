//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        lists: [],
        base: "https://xiaoyou.oubamall.com",
        Id: 0,
        status: 0,
        url2: '../../image/icon/goodA.png',
        url1: '../../image/icon/good.png'
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo(options.id);
        this.data.Id = options.id
        this.handlelikeStart()
    },
    handleToComment() {
        wx.redirectTo({
            url: `../comment/index?id=${this.data.Id}&type=3`
        })
    },
    getInfo(id) {
        request({
            url: `/wxReq/project/${id}`,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {

            this.setData({
                lists: res,
                Id: res.id
            })
        })
    },
    handlelikeStart() {
        let userId = wx.getStorageSync('userId')
        console.log(this.data.Id, userId);
        request({
            url: '/wxReq/like',
            method: 'POST',
            data: {
                topicType: 3,
                topicId: this.data.Id,
                userId: userId,
            },
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            this.setData({
                status: res.status
            });
            this.getInfo(this.data.Id)
        })
    }
});