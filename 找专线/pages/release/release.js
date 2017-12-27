const app = getApp();
var date = new Date();
Page({
  data: {
    list: [],
    province: [],
    city: [],
    local: '',
    start_txt: '出发地',
    end_txt: '目的地',
    p_i: 0,
    isP: true,
    cityshow: false,
    isstart: true,
    carlength: ['2.4米', '4.2米', '5.2米', '6.2米', '6.8米', '7.2米', '7.6米', '8.6米', '9.6米', '12.5米', '13米', '15米', '16.5米', '17.5米', '其他'],
    cartype: ['不限', '普货', '设配', '冷冻', '箱车', '敞车', '高护栏', '冷藏车', '罐车', '面包车', '金杯车', '微型车', '平板车', '特种车', '保温车', '棉被车', '其他'],
    goodstype: ['普货', '家具', '普货 重货', '设备', '皮革', '危险品', '配件', '重货', '泡货', '果蔬', '钢铁'],
    startT: '',
    endT: '2100-12-31',
    startDate: '',
    endDate: '',
    freeDate: '',
    stime: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    st: 0,
    etime: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    et: 0,
    ftime: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    ft: 0,
    carlength_i: 0,
    cartype_i: 0,
    goodstype_i: 0,
    ishuo: true,
    ische: false,
    iszhuan: false
  },
  Carlengthchange: function (e) {
    this.setData({
      carlength_i: e.detail.value
    })
  },
  Cartypechange: function (e) {
    this.setData({
      cartype_i: e.detail.value
    })
  },
  Goodstypechange: function (e) {
    this.setData({
      goodstype_i: e.detail.value
    })
  },
  SDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  EDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  FDateChange: function (e) {
    this.setData({
      freeDate: e.detail.value
    })
  },
  sTimeChange: function(e) {
    this.setData({
      st: e.detail.value
    })
  },
  eTimeChange: function (e) {
    this.setData({
      et: e.detail.value
    })
  },
  fTimeChange: function (e) {
    this.setData({
      ft: e.detail.value
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
  huoyuan: function(){
    this.setData({
      ishuo: true,
      ische: false,
      iszhuan: false
    })
  },
  cheyuan: function () {
    this.setData({
      ishuo: false,
      ische: true,
      iszhuan: false
    })
  },
  zhuanxian: function () {
    this.setData({
      ishuo: false,
      ische: false,
      iszhuan: true
    })
  },
  huoyuanSubmit: function(e){
    var huoForm = e.detail.value;
    var startcity = this.data.start_txt;
    var endcity = this.data.end_txt;
    var sTime = this.data.startDate + ' ' + this.data.st + '点';
    var eTime = this.data.endDate + ' ' + this.data.et + '点';
    var goods = this.data.goodstype[this.data.goodstype_i];
    var weight = (huoForm.weight ? huoForm.weight : '0') + '吨';
    var volume = (huoForm.volume ? huoForm.volume : '0') + 'm³';
    if (startcity == '出发地') {
      wx.showToast({
        title: '请选择出发地',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (endcity == '目的地') {
      wx.showToast({
        title: '请选择目的地',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else {
      var phoneNum = this.validatemobile(huoForm.phone);
      if (phoneNum) {
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/sethuoyuanlist',
          data: {
            startcity: startcity,
            startaddr: huoForm.startaddr,
            endcity: endcity,
            endaddr: huoForm.endaddr,
            weight: weight,
            volume: volume,
            sTime: sTime,
            eTime: eTime,
            goodstype: goods,
            phone: huoForm.phone,
            remark: huoForm.remark
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.showToast({
              title: '发布成功',
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
  cheyuanSubmit: function(e){
    var cheForm = e.detail.value;
    var freetime = this.data.freeDate + ' ' + this.data.ft + '点';
    var startcity = this.data.start_txt;
    var endcity = this.data.end_txt;
    var weight = (cheForm.weight ? cheForm.weight : '0') + '吨';
    var carlength = this.data.carlength[this.data.carlength_i];
    var cartype = this.data.cartype[this.data.cartype_i];
    if (startcity == '出发地') {
      wx.showToast({
        title: '请选择出发地',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (endcity == '目的地') {
      wx.showToast({
        title: '请选择目的地',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (cheForm.contacts == '') {
      wx.showToast({
        title: '请填写联系人',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else {
      var phoneNum = this.validatemobile(cheForm.phone);
      if (phoneNum) {
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/setcheyuanlist',
          data: {
            freetime: freetime,
            startcity: startcity,
            startaddr: cheForm.startaddr,
            endcity: endcity,
            endaddr: cheForm.endaddr,
            weight: weight,
            carlength: carlength,
            cartype: cartype,
            phone: cheForm.phone,
            contacts: cheForm.contacts,
            remark: cheForm.remark
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.showToast({
              title: '发布成功',
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
    var that = this;
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var H = date.getHours();
    var Date = Y + '-' + M + '-' + D;
    wx.setNavigationBarTitle({
      title: '供需发布',
    })
    that.setData({
      local: app.globalData.city,
      province: app.globalData.province,
      city: app.globalData.allcity,
      startT: Date,
      startDate: Date,
      endDate: Date,
      freeDate: Date,
      st: H,
      et: H,
      ft: H
    })
  },
})