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

  handleSend(e) {
    console.log(e)
    console.log(this.data.inputVal)
    let content = e.detail.value.content;
    let {
      id,
      type
    } = wx.getStorageSync('options');
    let data = wx.getStorageSync('data');
    console.log(type,id,data.userId,content)
    // wx.request({
    //   url: this.data.base + '/wxReq/comment',
    //   data: {
    //     topicType: type,
    //     topicId: id,
    //     userId: wx.getStorageSync('userId'),
    //     contents: content
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: 'POST',
    //   success: (result) => {
    //     console.log(result)
    //     this.setData({
    //       inputVal: ''
    //     });
    //     this.getInfo(id, type)
    //   },
    // });
  },
  getInfo(id, type) {
    wx.request({
      url: this.data.base + `/wxReq/comment/${id}/${type}?pageNum=1&pageSize=10`,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        let res = result.data.data.rows;
        this.setData({
          lists: res
        })
      },
    });
  }
});