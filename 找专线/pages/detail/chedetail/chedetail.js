const app = getApp();
Page({
  data: {
    cheDetail: {}
  },
  callphone: function (e) {
    var num = e.currentTarget.dataset.number;
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  onLoad: function (options) {
    var id = options.listid;
    var cheyuan = app.globalData.cheyuan;
    for (var i = 0; i < cheyuan.length; i++) {
      if (id == cheyuan[i].id) {
        this.setData({
          cheDetail: cheyuan[i]
        })
      }
    }
  },
})