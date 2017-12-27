const app = getApp();
var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    imgs: [
    	'../static/imgs/img1.png',
    	'../static/imgs/img2.png'
    ],
    vipinfo: {
      username: '点我登录'
    },
    city: '',
    list: [],
    list_backup: [],
    ishome: true,
    isenter: false,
    isuser: false,
    vipLogin: false,
    index_che: false,
    index_huo: true,
    index_inter: false,
    search_txt: '',
    x: 0,
    y: 0,
    z:0
  },
  searchTxt: function(e){
    this.setData({
      search_txt: e.detail.value
    })
  },
  searchBtn: function(){
    var list = this.data.list_backup;
    var search_key = new RegExp(this.data.search_txt);
    var search_list = [];
    for (var i = 0; i < list.length; i++){
      var info = '';
      for(var key in list[i]){
        info += list[i][key];
      }
      if(search_key.test(info)){
        search_list.push(list[i]);
      }
    }
    this.setData({
      list: search_list
    })
  },
  toJPJC: function(e){
    var navtit = e.currentTarget.dataset.navtit;
    wx.navigateTo({
      url: '../JPJC/JPJC?navtit=' + navtit,
    })
  },
  toLKZX: function () {
    wx.navigateTo({
      url: '../LKZX/LKZX',
    })
  },
  toLUYUN: function () {
    wx.navigateTo({
      url: '../LUYUN/LUYUN',
    })
  },
  toVIP: function(){
    var that = this;
    wx.getStorage({
      key: 'vipInfo',
      success: function () {
        wx.navigateTo({
          url: '../VIP/VIP',
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true,
          success: function () {
            setTimeout(function () {
              that.setData({
                ishome: false,
                isenter: true,
                isuser: false
              })
              wx.setNavigationBarTitle({
                title: '会员入驻',
              })
            }, 1500)
          }
        })
      }
    })
  },
  toRELE: function(){
    var that = this;
    wx.getStorage({
      key: 'vipInfo',
      success: function () {
        wx.navigateTo({
          url: '../release/release',
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true,
          success: function () {
            setTimeout(function () {
              that.setData({
                ishome: false,
                isenter: true,
                isuser: false
              })
              wx.setNavigationBarTitle({
                title: '会员入驻',
              })
            }, 1500)
          }
        })
      }
    })
  },
  toHOME: function(){
    this.setData({
      ishome: true,
      isenter: false,
      isuser: false
    })
    wx.setNavigationBarTitle({
      title: '江南达物流',
    })
  },
  toENTER: function () {
    this.setData({
      ishome: false,
      isenter: true,
      isuser: false
    })
    wx.setNavigationBarTitle({
      title: '会员入驻',
    })
  },
  toUSER: function () {
    this.setData({
      ishome: false,
      isenter: false,
      isuser: true
    })
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },
  toHuoDetail: function(e){
    var listid = e.currentTarget.dataset.listid;
    wx.navigateTo({
      url: '../detail/huodetail/huodetail?listid=' + listid,
    })
  },
  toCheDetail: function (e) {
    var listid = e.currentTarget.dataset.listid;
    wx.navigateTo({
      url: '../detail/chedetail/chedetail?listid=' + listid,
    })
  },
  indexhuo: function(){
    this.setData({
      index_che: false,
      index_huo: true,
      index_inter: false,
      list: app.globalData.huoyuan,
      list_backup: app.globalData.huoyuan
    })
  },
  indexche: function () {
    this.setData({
      index_che: true,
      index_huo: false,
      index_inter: false,
      list: app.globalData.cheyuan,
      list_backup: app.globalData.cheyuan
    })
  },
  indexinter: function(){
    this.setData({
      index_che: false,
      index_huo: false,
      index_inter: true,
      list: [],
      list_backup: []
    })
  },
  toCominfo: function(){
    wx.getStorage({
      key: 'vipInfo',
      success: function () {
        wx.navigateTo({
          url: '../enter/companyinfo/companyinfo',
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  toAdd: function () {
    wx.getStorage({
      key: 'vipInfo',
      success: function () {
        wx.navigateTo({
          url: '../enter/add/add',
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  toAddNa: function(){
    
  },
  toShare: function () {
    wx.getStorage({
      key: 'vipInfo',
      success: function () {
        wx.navigateTo({
          url: '../enter/share/share',
        })
      },
      fail: function(){
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  toPrivilege: function(){
    wx.navigateTo({
      url: '../enter/privilege/privilege',
    })
  },
  toYuyue: function () {
    wx.getStorage({
      key: 'vipInfo',
      success: function(res) {
        wx.navigateTo({
          url: '../user/yuyue/yuyue',
        })
      },
      fail: function(){
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  toQR: function(){
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        wx.navigateTo({
          url: '../user/qrcode/qrcode',
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  toKefu: function () {
    wx.navigateTo({
      url: '../user/kefu/kefu',
    })
  },
  toOpinion: function () {
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        wx.navigateTo({
          url: '../user/advice/advice',
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  vipLogin: function(){
    wx.navigateTo({
      url: '../index/vipuser/vipuser',
    })
  },
  vipLogout: function(){
    wx.clearStorage();
    this.setData({
      vipinfo: {
        username: '点我登录'
      },
      vipLogin: false
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        that.setData({
          vipinfo: res.data,
          vipLogin: true
        })
      }
    })
    /* 获取当前城市 */
    qqmapsdk = new QQMapWX({
      key: 'H4HBZ-AGBKP-QCWDN-LCDDE-BMX37-F5FSH'
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            var city = res.result.ad_info.city;
            app.globalData.city = city;
            that.setData({
              city: city
            })
          }
        })
      }
    })
    /* 获取后台数据 */
    /* 获取货源列表 */
    wx.request({
      url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/gethuoyuanlist',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data,
          list_backup: res.data
        })
        app.globalData.huoyuan = res.data;
      }
    })
    /* 获取车源列表 */
    wx.request({
      url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getcheyuanlist',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.cheyuan = res.data;
      }
    })
    /* 获取会员专线列表 */
    wx.request({
      url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getvipzhuanxianlist',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.vipzhuan = res.data;
      }
    })
  },
  onShow: function(){
    var that = this;
    wx.getStorage({
      key: 'vipInfo',
      success: function(res) {
        that.setData({
          vipinfo: {
            username: res.data.username
          },
          vipLogin: true,
        })
      },
    })
  }
})