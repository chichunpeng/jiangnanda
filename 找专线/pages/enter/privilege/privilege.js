const app = getApp();
Page({
  data: {
    privilege: []
  },
  onLoad: function (options) {
    var that = this;
    var privileges = [];
    wx.getStorage({
      key: 'Privilege',
      success: function(res) {
        that.setData({
          privilege: res.data.privileges
        })
      },
      fail: function(){
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getPrivilege',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            for(var i = 0; i < res.data.length; i++){
              privileges.push(res.data[i].privilege);
            }
            that.setData({
              privilege: privileges
            })
            wx.setStorage({
              key: 'Privilege',
              data: {
                privileges: privileges
              },
            })
          }
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '会员特权',
    })
  }
})