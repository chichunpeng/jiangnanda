const app = getApp();
Page({
  data: {
    local: '',
    list: [],
    province: [],
    city: [],
    start_txt: '请选择发货地',
    end_txt: '请选择目的地',
    p_i: 0,
    isP: true,
    cityshow: false,
    isstart: true,
    p_i: '',
    username: '',
    contacts: '',
    phone: '',
    comAddr: '',
    Btn_txt: '添加',
    url: '',
    success_txt: ''
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
  formSubmit: function (e) {
    var formdata = e.detail.value;
    var url = this.data.url;
    var startcity = this.data.start_txt;
    var endcity = this.data.end_txt;
    var vipid = this.data.username;
    var id = this.data.id;
    var success_txt = this.data.success_txt;
    if (startcity == '请选择发货地') {
      wx.showToast({
        title: '请选择发货地',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (endcity == '请选择目的地') {
      wx.showToast({
        title: '请选择目的地',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (formdata.contacts == '') {
      wx.showToast({
        title: '请填写联系人',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (formdata.addr == '') {
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else {
      var phoneNum = this.validatemobile(formdata.phone);
      if (phoneNum) {
        wx.getStorage({
          key: 'comInfo',
          success: function (res) {
            var comInfo = res.data;
            wx.request({
              url: url,
              data: {
                startcity: startcity,
                endcity: endcity,
                comName: comInfo.comName,
                contacts: formdata.contacts,
                phone: formdata.phone,
                addr: formdata.addr,
                remark: formdata.remark,
                comCall: '',
                comPic: comInfo.picID[2],
                vipid: vipid,
                id: id
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                app.globalData.addvipzhuan = true;
                wx.showToast({
                  title: success_txt,
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
                setTimeout(function () {
                  wx.navigateBack()
                }, 1500)
              }
            })
          },
          fail: function () {
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
    var that = this;
    var whattype = options.type;
    var id = options.id;
    var allzhuan = app.globalData.vipzhuan;
    if(whattype == 'add'){
      that.setData({
        Btn_txt: '添加',
        url: 'https://app.lovejia.net/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/setviphuanxianlist',
        success_txt: '添加成功'
      })
      wx.getStorage({
        key: 'comInfo',
        success: function (res) {
          that.setData({
            contacts: res.data.contacts,
            phone: res.data.phone,
            comAddr: res.data.comAddr
          })
        }
      })
    }else{
      that.setData({
        Btn_txt: '修改',
        url: 'https://app.lovejia.net/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateviphuanxianlist',
        id: id,
        success_txt: '修改成功'
      })
      for (var i = 0; i < allzhuan.length; i++){
        if (allzhuan[i].id == id){
          that.setData({
            start_txt: allzhuan[i].startcity,
            end_txt: allzhuan[i].endcity,
            contacts: allzhuan[i].contacts,
            phone: allzhuan[i].phone,
            comAddr: allzhuan[i].addr
          })
        }
      }
    }
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        that.setData({
          username: res.data.username
        })
      }
    })
    that.setData({
      local: app.globalData.city,
      province: app.globalData.province,
      city: app.globalData.allcity
    })
    wx.setNavigationBarTitle({
      title: '添加专线线路',
    })
  },
})