const app = getApp();
Page({
  data: {
    huoDetail: {}
  },
  callphone: function (e) {
    var num = e.currentTarget.dataset.number;
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  onLoad: function (options) {
    var id = options.listid;
    var huoyuan = app.globalData.huoyuan;
    for (var i = 0; i < huoyuan.length; i++) {
      if (id == huoyuan[i].id) {
        this.setData({
          huoDetail: huoyuan[i]
        })
      }
    }
  },
})