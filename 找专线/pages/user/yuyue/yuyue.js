const app = getApp();
Page({
  data: {
    myYuyue: [],
  },
  toAddyuyue: function(){
    wx.navigateTo({
      url: '../../user/yuyue/myyuyue/myyuyue',
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'yuyueList',
      success: function(res) {
        that.setData({
          myYuyue: res.data.yuyuelist
        })
      },
      fail: function(){
        wx.getStorage({
          key: 'vipInfo',
          success: function (res) {
            wx.request({
              url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getYuyue',
              data: {
                vipid: res.data.username
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                wx.setStorage({
                  key: 'yuyueList',
                  data: {
                    yuyuelist: res.data
                  }
                })
                that.setData({
                  myYuyue: res.data
                })
              }
            })
          },
        })
      }
    })
  }
})