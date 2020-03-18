//Page Object
import { request } from '../../utils/request.js'
Page({
    data: {
        content: '',
        imgUrl: ''
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        const baseUrl = "https://xiaoyou.oubamall.com";
        request({
            url: '/wxReq/schoolHistory',
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            this.setData({
                content: res.contents,
                imgUrl: baseUrl + res.imgUrl
            })
        })
    }
});