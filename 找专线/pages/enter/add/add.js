const app = getApp();
Page({
  data: {
    list: [],
    vipid: ''
  },
  toAdd: function(){
    wx.navigateTo({
      url: '../add/myzhuanxian/myzhuanxian?type=add',
    })
  },
  toEdit: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../add/myzhuanxian/myzhuanxian?type=edit&id=' + id,
    })
  },
  toDel: function(e){
    var that = this;
    var newlist = this.data.list;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '是否删除专线',
      success: function(res){
        if (res.confirm){
          wx.request({
            url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/delvipzhuanxianlist',
            data: {
              id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              newlist.splice(index,1);
              that.setData({
                list: newlist
              })
              for (var i = 0; i < app.globalData.vipzhuan.length; i++){
                if (app.globalData.vipzhuan[i].id == id){
                  app.globalData.vipzhuan.splice(i,1);
                }
              }
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    var myzhuanxian = [];
    var allzhuanxian = app.globalData.vipzhuan;
    wx.getStorage({
      key: 'vipInfo',
      success: function (res) {
        var vipid = res.data.username;
        for (var i = 0; i < allzhuanxian.length; i++){
          if(allzhuanxian[i].vipid == vipid){
            myzhuanxian.push(allzhuanxian[i]);
          }
        }
        that.setData({
          list: myzhuanxian,
          vipid: vipid
        })
      },
    })
    wx.getStorage({
      key: 'comInfo',
      success: function (res) {
      },
      fail: function () {
        wx.request({
          url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getviplist',
          data: {
            username: that.data.vipid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.comName == null) {
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
      title: '我的专线',
    })
  },
  onShow: function(){
    var that = this;
    var vipid = that.data.vipid;
    var myzhuanxian = [];
    if (app.globalData.addvipzhuan){
      wx.request({
        url: app.globalData.requestUrl + '/jiangnandacms/index.php?s=/w16/Jiangnanda/Jiangnanda/getvipzhuanxianlist',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          app.globalData.vipzhuan = res.data;
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].vipid == vipid) {
              myzhuanxian.push(res.data[i]);
            }
          }
          that.setData({
            list: myzhuanxian
          })
        }
      })
      app.globalData.addvipzhuan = false;
    }
  }
})