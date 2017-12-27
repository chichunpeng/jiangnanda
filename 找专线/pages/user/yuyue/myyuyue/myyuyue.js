const app = getApp();
var date = new Date();
Page({
  data: {
    date: '',
    contacts: '',
    phone: '',
    remark: '',
    vipid: ''
  },
  callBtn: function () {
    wx.makePhoneCall({
      phoneNumber: '400-666-1011',
    })
  },
  formSubmit: function (e) {
    var formData = e.detail.value;
    wx.request({
      url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/addYuyue',
      data: {
        time: this.data.date,
        contacts: formData.name,
        phone: formData.phone,
        remark: formData.remark,
        vipid: this.data.vipid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 1500,
        })
      }
    })
    // var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // var maxPos = chars.length;
    // var nonceStr = '';
    // var timeStamp = Date.parse(new Date()) / 1000;
    // timeStamp = timeStamp.toString();
    // for (var i = 0; i < 32; i++) {
    //   nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
    // }
    // console.log(timeStamp)
    // wx.requestPayment({
    //   'timeStamp': timeStamp,
    //   'nonceStr': nonceStr,
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success': function (res) {
    //     console.log('支付成功')
    //   },
    //   'fail': function (res) {
    //     console.log(res)
    //   }
    // })
  },
  onLoad: function (options) {
    var that = this;
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var H = date.getHours();
    var i = date.getMinutes();
    var Date = Y + '年' + M + '月' + D + '日' + H + ':' + i;
    that.setData({
      date: Date
    })
    wx.getStorage({
      key: 'comInfo',
      success: function(res) {
        that.setData({
          contacts: res.data.contacts,
          phone: res.data.phone
        })
      },
    })
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        that.setData({
          vipid: res.data.username
        })
      },
    })
    wx.setNavigationBarTitle({
      title: '我的预约',
    })
  },
})