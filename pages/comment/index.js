//Page Object
Page({
  data: {
    lists: [],
    base: "http://m2t9650514.qicp.vip",
    content: '',
    inputVal: ''
  },
  //options(Object)
  onLoad: function(options) {
    console.log(options);
    wx.setStorageSync('options', options);
    this.getInfo(options.id, options.type);
  },
  formName(e){
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
    console.log(data)
    console.log(type,id,data,this.data.content)
    wx.request({
      url: this.data.base + '/wxReq/comment',
      data: {
        "topicType": type,
        "topicId": id,
        "userId": Number(data),
        "contents": this.data.content
      },
      header: {
        "Content-Type": "application/json",
        token: wx.getStorageSync('token')
      },
      method: 'POST',
      success: (result) => {
        console.log(result)
        wx.showToast({
          title: '提交评论成功，等待审核',
          icon: 'none',
          duration: 3000,
          mask: false,
          success: (result) => { },
        });
        this.setData({
          inputVal: ''
        });
        this.getInfo(id, type)
      },
    });
  },
  getInfo(id, type) {
    console.log()
    wx.request({
      url: this.data.base + `/wxReq/comment/${id}/${type}?pageNum=1&pageSize=10`,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result)
        let res = result.data.data.rows;
        this.setData({
          lists: res
        })
      },
    });
  }
});