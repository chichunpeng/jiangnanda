const app = getApp();
Page({
  data: {
    username: '',
    picID: [0,0,0,0],
    picSrc: [],
    btnok: false,
    comName: '',
    contacts: '',
    phone: '',
    comAddr: '',
    hasInfo: false
  },
  disclaimerBtn: function(){
    if (this.data.btnok) {
      this.setData({
        btnok: false
      })
    } else {
      this.setData({
        btnok: true
      })
    }
  },
  changePic1: function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '图片替换中',
        })
        that.data.picSrc[0] = res.tempFilePaths[0];
        that.setData({
          picSrc: that.data.picSrc
        })
        wx.uploadFile({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Api/Api/upload& PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
          filePath: that.data.picSrc[0],
          name: 'download',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            var pic1 = JSON.parse(res.data);
            that.setData({
              'picID[0]': pic1.id
            })
            wx.request({
              url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateImg',
              data: {
                imgid: pic1.id,
                imgname: 'IDcardimg',
                username: that.data.username
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: '图片替换成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
              }
            })
          }
        })
      }
    })
  },
  changePic2: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '图片替换中',
        })
        that.data.picSrc[1] = res.tempFilePaths[0];
        that.setData({
          picSrc: that.data.picSrc
        })
        wx.uploadFile({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Api/Api/upload& PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
          filePath: that.data.picSrc[1],
          name: 'download',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            var pic2 = JSON.parse(res.data);
            that.setData({
              'picID[1]': pic2.id
            })
            wx.request({
              url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateImg',
              data: {
                imgid: pic2.id,
                imgname: 'licenseimg',
                username: that.data.username
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: '图片替换成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
              }
            })
          }
        })
      }
    })
  },
  changePic3: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '图片替换中',
        })
        that.data.picSrc[2] = res.tempFilePaths[0];
        that.setData({
          picSrc: that.data.picSrc
        })
        wx.uploadFile({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Api/Api/upload& PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
          filePath: that.data.picSrc[2],
          name: 'download',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            var pic3 = JSON.parse(res.data);
            that.setData({
              'picID[2]': pic3.id
            })
            wx.request({
              url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateImg',
              data: {
                imgid: pic3.id,
                imgname: 'companyimg1',
                username: that.data.username
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: '图片替换成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
              }
            })
          }
        })
      }
    })
  },
  changePic4: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '图片替换中',
        })
        that.data.picSrc[3] = res.tempFilePaths[0];
        that.setData({
          picSrc: that.data.picSrc
        })
        wx.uploadFile({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Api/Api/upload& PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
          filePath: that.data.picSrc[3],
          name: 'download',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            var pic4 = JSON.parse(res.data);
            that.setData({
              'picID[3]': pic4.id
            })
            wx.request({
              url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateImg',
              data: {
                imgid: pic4.id,
                imgname: 'companyimg2',
                username: that.data.username
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: '图片替换成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
              }
            })
          }
        })
      }
    })
  },
  formSubmit: function(e){
    var formdata = e.detail.value;
    var that = this;
    if (formdata.comName == ''){
      wx.showToast({
        title: '请填写公司名称',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (formdata.contacts == ''){
      wx.showToast({
        title: '请填写联系人',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (formdata.comAddr == '') {
      wx.showToast({
        title: '请填写公司地址',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (this.data.picSrc[0] == '') {
      wx.showToast({
        title: '请上传手持身份证图',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (this.data.picSrc[1] == '') {
      wx.showToast({
        title: '请上传营业执照',
        icon: 'loading',
        duration: 1500
      })
    } else if (this.data.picSrc[2] == '' || this.data.picSrc[3] == '') {
      wx.showToast({
        title: '请上传公司门面图',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    } else if (!this.data.btnok) {
      wx.showToast({
        title: '请同意免责说明',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
    }else{
      var phoneNum = this.validatemobile(formdata.phone);
      if (phoneNum){
        var url = '';
        if (this.data.hasInfo) {
          url = app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/updateViplist';
        } else {
          url = app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/setViplist';
        }
        wx.showLoading({
          title: '保存中',
        })
        wx.request({
          url: url,
          data: {
            comName: formdata.comName,
            contacts: formdata.contacts,
            phone: formdata.phone,
            comAddr: formdata.comAddr,
            IDcardimg: that.data.picID[0],
            licenseimg: that.data.picID[1],
            companyimg1: that.data.picID[2],
            companyimg2: that.data.picID[3],
            username: that.data.username
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.setStorage({
              key: "comInfo",
              data: {
                comName: formdata.comName,
                contacts: formdata.contacts,
                phone: formdata.phone,
                comAddr: formdata.comAddr,
                disclaimer: true,
                picSrc: that.data.picSrc,
                picID: that.data.picID
              },
              success: function () {
                that.setData({
                  hasInfo: true
                })
                wx.hideLoading()
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
              }
            })
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
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        var username = res.data.username;
        that.setData({
          username: username
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '维护公司信息',
    })
    wx.getStorage({
      key: 'comInfo',
      success: function (res) {
        that.setData({
          picID: res.data.picID,
          picSrc: res.data.picSrc,
          btnok: res.data.disclaimer,
          comName: res.data.comName,
          contacts: res.data.contacts,
          phone: res.data.phone,
          comAddr: res.data.comAddr,
          hasInfo: true
        })
      },
      fail: function () {
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
                picID: resdata.imgid,
                picSrc: resdata.imgsrc,
                btnok: true,
                comName: resdata.comName,
                contacts: resdata.contacts,
                phone: resdata.phone,
                comAddr: resdata.comAddr,
                hasInfo: true
              })
              wx.setStorage({
                key: "comInfo",
                data: {
                  comName: resdata.comName,
                  contacts: resdata.contacts,
                  phone: resdata.phone,
                  comAddr: resdata.comAddr,
                  disclaimer: true,
                  picSrc: resdata.imgsrc,
                  picID: resdata.imgid
                }
              })
            }
          }
        })
      }
    })
  }
})