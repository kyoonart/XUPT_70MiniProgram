// import { request } from "../../request/index.js"
Page({
    data: {
        schoolName: '',
        schoolEstablishmentTime: '',
        dwsj: '',
        jwsj: '',
        dwfsj: '',
        accountant: '',
        principal: '',
        vicePrincipal: '',
        schoolProfile: '',
        imgUrl: ''
    },
    //options(Object)
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        const baseUrl = "http://m2t9650514.qicp.vip";
        wx.request({
            url: baseUrl + '/wxReq/schoolInfo',
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            success: (result) => {
                let res = result.data.data
                this.setData({
                    schoolName: res.schoolName,
                    schoolEstablishmentTime: res.schoolEstablishmentTime,
                    dwsj: res.dwsj,
                    jwsj: res.jwsj,
                    dwfsj: res.dwfsj,
                    accountant: res.accountant,
                    principal: res.principal,
                    vicePrincipal: res.vicePrincipal,
                    schoolProfile: res.schoolProfile,
                    imgUrl: res.imgUrl[0]
                })
            },
        });
    }

});