//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        list: []
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        // const baseUrl = "http://m2t9650514.qicp.vip";
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