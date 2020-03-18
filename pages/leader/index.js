//Page Object
import { request } from '../../utils/request'
Page({
    data: {
        lists: [],
        base: "https://xiaoyou.oubamall.com"
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo();

    },
    getInfo() {
        request({
            url: '/wxReq/previousLeaders?pageNum=1&pageSize=10',
            method: 'GET',
            dataType: 'json',
            responseType: 'text',

        }).then((res) => {
            this.setData({
                lists: res.rows,
            })
        })

    }
});