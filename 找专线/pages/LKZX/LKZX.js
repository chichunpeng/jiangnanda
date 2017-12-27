const app = getApp();
Page({
  data: {
    local: '',
    list: [],
    province: [],
    city: [],
    start_txt: '起点',
    end_txt: '终点',
    p_i: 0,
    isP: true,
    cityshow: false,
    isstart: true,
    p_i: ''
  }, 
  startBtn: function () {
    this.setData({
      list: this.data.province,
      cityshow: true,
      isstart: true,
      isP: true
    })
  },
  endBtn: function () {
    this.setData({
      list: this.data.province,
      cityshow: true,
      isstart: false,
      isP: true
    })
  },
  changeP: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      list: this.data.city[index],
      isP: false,
      p_i: index
    })
  },
  changeC: function (e) {
    var index = e.currentTarget.dataset.index;
    var city = this.data.city[this.data.p_i][index];
    if (this.data.isstart) {
      this.setData({
        start_txt: city,
        cityshow: false
      })
    } else {
      this.setData({
        end_txt: city,
        cityshow: false
      })
    }
  },
  changeL: function () {
    if (this.data.isstart) {
      this.setData({
        start_txt: this.data.local,
        cityshow: false
      })
    } else {
      this.setData({
        end_txt: this.data.local,
        cityshow: false
      })
    }
  },
  close: function () {
    this.setData({
      cityshow: false,
      priceshow: false
    })
  },
  back: function () {
    this.setData({
      list: this.data.province,
      isP: true
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '空运专线'
    })
    this.setData({
      local: app.globalData.city,
      province: app.globalData.province,
      city: app.globalData.allcity
    })
  },
})