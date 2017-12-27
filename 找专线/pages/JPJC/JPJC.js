const app = getApp();

Page({
  data: {
    addr: [],
    start_txt: '起点',
    end_txt: '终点',
    isstart: true,
    addrshow: false
  },
  startBtn: function () {
    this.setData({
      isstart: true,
      addrshow: true
    })
  },
  endBtn: function () {
    this.setData({
      isstart: false,
      addrshow: true
    })
  },
  back: function () {
    this.setData({
      addrshow: false
    })
  },
  changeAddr: function(e){
    var i = e.currentTarget.dataset.index;
    if (this.data.isstart) {
      this.setData({
        start_txt: this.data.addr[i],
        addrshow: false
      })
    } else {
      this.setData({
        end_txt: this.data.addr[i],
        addrshow: false
      })
    }
  },
  toYuyue: function(){
    wx.navigateTo({
      url: '../user/yuyue/myyuyue/myyuyue',
    })
  },
  onLoad: function (options) {
    var that = this;
    var addr = [];
    wx.request({
      url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getzhuanaddr',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for(var i = 0; i < res.data.length; i++){
          addr.push(res.data[i].addr);
        }
        that.setData({
          addr: addr
        })
      }
    })
    var navtit = options.navtit;
    wx.setNavigationBarTitle({
      title: navtit,
    })
  },
})