import { request } from '../../utils/request'
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
        base: 'https://xiaoyou.oubamall.com',
        lists: [],
        imgUrl: []

    },
    onLoad: function(options) {
        this.getInfo()
    },
    getInfo() {
        request({
            url: '/wxReq/schoolInfo',
            method: 'GET',
            dataType: 'json',

        }).then((res) => {
            console.log(res);
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
                imgUrl: res.imgUrl
            })
        });
        request({
            url: '/wxReq/previousLeaders?pageNum=1&pageSize=10',
            method: 'GET',
            dataType: 'json',
            responseType: 'text'
        }).then((res) => {
            this.setData({
                lists: res.rows,
            })
        })
    }
});