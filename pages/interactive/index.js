//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        lists: [],
        base: "https://xiaoyou.oubamall.com",
        contents: [],
        url2: '../../image/icon/goodA.png',
        url1: '../../image/icon/good.png',
        status: 0
    },
    onLoad: function(options) {
        this.getInfo();
        // this.handlelikeStart(e)
    },
    getInfo() {
        request({
            url: '/wxReq/activity?pageNum=1&pageSize=10',
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            let arr = res.rows
            arr = arr.map((item, index) => {
                let reg = /<[^<>]+>/g;
                return item.contents.replace(reg, '')
            })
            for (let i = 0; i < res.rows.length; i++) {
                res.rows[i]['hasChange'] = false
            }
            this.setData({
                lists: res.rows,
                contents: arr
            })
        })
    },
    handleVer() {
        let verifyStatus = wx.getStorageSync('verifyStatus');
        if (verifyStatus == 0) {
            wx.showToast({
                title: '请您在首页进行校友验证',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: false,
                success: (result) => {},
            });
        } else {
            wx.navigateTo({
                url: "../sendInterActive/index",
                success: (result) => {},
            });
        }
    },
    handlelikeStart(e) {
        let topicId = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let list = this.data.lists
        console.log(topicId);
        let userId = wx.getStorageSync('userId')
        request({
            url: '/wxReq/like',
            method: 'POST',
            data: {
                topicType: 2,
                topicId: topicId,
                userId: userId,
            },
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            if (res.status == 1) {
                list[index]['hasChange'] = true;
                list[index]['likeNums'] += 1
            } else {
                list[index]['hasChange'] = false;
                list[index]['likeNums'] -= 1
            }

            this.setData({
                lists: list
            });

        })
    }


});