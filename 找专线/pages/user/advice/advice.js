const app = getApp();
Page({
  data: {
  },
  formSubmit: function(e){
    var formdata = e.detail.value;
    if (formdata.name == '') {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (formdata.advice == '') {
      wx.showToast({
        title: '请输入意见！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else {
      var phoneNum = this.validatemobile(formdata.phone);
      if (phoneNum){
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/setAdvice',
          data: {
            name: formdata.name,
            phone: formdata.phone,
            advice: formdata.advice
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500,
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 1500)
          }
        })
      }
    }
  },
  validatemobile: function (mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      return false;
    }
    return true;
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意见反馈',
    })
  },
})