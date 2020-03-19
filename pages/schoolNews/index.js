//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        list: [],
        base: 'https://xiaoyou.oubamall.com'
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        request({
            url: '/wxReq/news?pageNum=1&pageSize=10',
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
        }).then((res) => {
            this.setData({
                list: res.rows
            })
        })
    }
});