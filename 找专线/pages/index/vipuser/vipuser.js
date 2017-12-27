const app = getApp();
Page({
  data: {
    username: '',
    password: ''
  },
  Getusername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  Getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  toRegister: function(){
    wx.navigateTo({
      url: '../../index/register/register',
    })
  },
  losepwd: function () {
    wx.navigateTo({
      url: '../../index/losepwd/losepwd',
    })
  },
  Login: function(){
    var username = this.data.username;
    var password = this.data.password;
    if (username != '' && password != ''){
      wx.request({
        url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/loginVIP',
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data) {
            wx.setStorage({
              key: "vipInfo",
              data: {
                username: username,
                password: password
              }
            })
            app.globalData.viplogin = true;
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 1500,
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              title: '用户密码错误！',
              icon: 'loading',
              duration: 1500,
              mask: true
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '输入不能为空！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    }
  },
})