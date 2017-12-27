const app = getApp();
Page({
  data: {
    zhuanxian: [],
    list: [],
    province: [],
    city: [],
    local: '',
    start_txt: '起点',
    end_txt: '终点',
    p_i: 0,
    isP: true,
    cityshow: false,
    isstart: true,
    p_i: '',
    islocal: true,
    isabroad: false
  },
  localzhuan: function(){
    this.setData({
      islocal: true,
      isabroad: false
    })
  },
  abroadzhuan: function () {
    this.setData({
      islocal: false,
      isabroad: true
    })
  },
  startBtn: function () {
    this.setData({
      list: this.data.province,
      cityshow: true,
      isstart: true,
      isP: true
    })
  },
  toVipdetail: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/vipdetail/vipdetail?id=' + id,
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
  toEnter: function(){
    app.globalData.vip = true;
    wx.navigateBack()
  },
  search: function(){
    var start = this.data.start_txt;
    var end = this.data.end_txt;
    var vipzhuan1 = [];
    var vipzhuan2 = [];
    if(start == '起点' && end == '终点'){
      this.setData({
        zhuanxian: app.globalData.vipzhuan
      })
    } else if (end == '终点'){
      for (var i = 0; i < app.globalData.vipzhuan.length; i++){
        if (app.globalData.vipzhuan[i].startcity == start){
          vipzhuan1.push(app.globalData.vipzhuan[i])
        }
      }
      this.setData({
        zhuanxian: vipzhuan1
      })
    } else if (start == '起点'){
      for (var i = 0; i < app.globalData.vipzhuan.length; i++) {
        if (app.globalData.vipzhuan[i].endcity == end) {
          vipzhuan1.push(app.globalData.vipzhuan[i])
        }
      }
      this.setData({
        zhuanxian: vipzhuan1
      })
    }else{
      for (var i = 0; i < app.globalData.vipzhuan.length; i++) {
        if (app.globalData.vipzhuan[i].startcity == start) {
          vipzhuan1.push(app.globalData.vipzhuan[i])
        }
      }
      for (var i = 0; i < vipzhuan1.length; i++) {
        if (vipzhuan1[i].endcity == end) {
          vipzhuan2.push(vipzhuan1[i])
        }
      }
      this.setData({
        zhuanxian: vipzhuan2
      })
    }
  },
  callBtn: function(e){
    var phoneNum = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNum,
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '会员专线',
    })
    this.setData({
      zhuanxian: app.globalData.vipzhuan,
      local: app.globalData.city,
      province: app.globalData.province,
      city: app.globalData.allcity
    })
  }
})