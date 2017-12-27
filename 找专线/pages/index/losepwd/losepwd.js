const app = getApp();
Page({
  data: {
    userinfo: {
      avatarUrl: '../../static/imgs/icon02.png',
      nickName: ''
    },
    vipid: '',
    pwd: '',
    Checkpwd: false,
    CheckpwdTxt: '',
    Checkpwd2: false,
    Checkpwd2Txt: ''
  },
  CheckPwd: function (e) {
    var pwd = e.detail.value;
    if (pwd == '') {
      this.setData({
        Checkpwd: false,
        CheckpwdTxt: '密码不能为空！'
      })
    } else {
      this.setData({
        pwd: pwd,
        Checkpwd: true,
        CheckpwdTxt: ''
      })
    }
  },
  CheckPwd2: function (e) {
    var pwd2 = e.detail.value;
    if (pwd2 == '') {
      this.setData({
        Checkpwd2: false,
        Checkpwd2Txt: '密码不能为空！'
      })
    } else {
      if (pwd2 == this.data.pwd) {
        this.setData({
          Checkpwd2: true,
          Checkpwd2Txt: ''
        })
      } else {
        this.setData({
          Checkpwd2: false,
          Checkpwd2Txt: '两次输入密码不一致！'
        })
      }
    }
  },
  register: function () {
    var vipid = this.data.vipid;
    var password = this.data.pwd;
    if (this.data.Checkpwd && this.data.Checkpwd2) {
      wx.request({
        url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateVIP',
        data: {
          username: vipid,
          password: password
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '密码修改成功',
            icon: 'success',
            duration: 1500,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack()
          }, 1500)
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息！',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getOpenid',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var openid = res.data.openid;
            wx.request({
              url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getVIPID',
              data: {
                openid: openid
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (!res.data.callback) {
                  var vipid = res.data.username;
                  wx.getSetting({
                    success: function (res) {
                      wx.getUserInfo({
                        success: function (res) {
                          var userinfo = res.userInfo;
                          that.setData({
                            userinfo: userinfo,
                            vipid: vipid,
                            isRegister: false
                          })
                        }
                      })
                    }
                  })
                } else {
                  wx.showToast({
                    title: '您没有注册！',
                    icon: 'loading',
                    duration: 1500,
                    mask: true
                  })
                  setTimeout(function () {
                    wx.navigateBack()
                  }, 1500)
                }
              }
            })
          }
        })
      }
    })
  }
})