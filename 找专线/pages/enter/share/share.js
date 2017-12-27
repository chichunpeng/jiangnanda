const app = getApp();
Page({
  data: {
    comName: '',
    comPic: '',
    username: ''
  },

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        var username = res.data.username;
        that.setData({
          username: username
        })
      }
    })
    wx.getStorage({
      key: 'comInfo',
      success: function (res) {
        that.setData({
          comName: res.data.comName,
          comPic: res.data.picSrc[2]
        })
      },
      fail: function(){
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getviplist',
          data: {
            username: that.data.username
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.comName != null) {
              var resdata = res.data;
              that.setData({
                comName: resdata.comName,
                comPic: resdata.imgsrc[2]
              })
              wx.setStorage({
                key: "comInfo",
                data: {
                  comName: resdata.comName,
                  contacts: resdata.contacts,
                  phone: resdata.phone,
                  comAddr: resdata.comAddr,
                  disclaimer: true,
                  picSrc: resdata.imgsrc
                }
              })
            } else {
              wx.showToast({
                title: '请完善公司信息',
                icon: 'loading',
                duration: 1500,
                mask: true
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/enter/companyinfo/companyinfo',
                })
              }, 1500)
            }
          }
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '分享',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '物流联盟，免费推广，快来入驻！',
      path: '/pages/index/index'
    }
  }
})