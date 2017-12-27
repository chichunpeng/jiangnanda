Page({
  data: {
  
  },
  call: function(){
    wx.makePhoneCall({
      phoneNumber: '',
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客服中心',
    })
  }
})