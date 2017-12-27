const app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'H4HBZ-AGBKP-QCWDN-LCDDE-BMX37-F5FSH'
});

Page({
  data: {
    imgsrc: '',
    comName: '',
    startcity: '',
    endcity: '',
    contacts: '',
    phone: '',
    comAddr: ''
  },
  openMap: function(){
    var addr = this.data.comAddr
    qqmapsdk.geocoder({
      address: addr,
      success: function (res) {
        var latitude = res.result.location.lat;
        var longitude = res.result.location.lng;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var allvipzhuan = app.globalData.vipzhuan;
    for (var i = 0; i < allvipzhuan.length; i++){
      if(id == allvipzhuan[i].id){
        this.setData({
          imgsrc: allvipzhuan[i].comPic,
          comName: allvipzhuan[i].comName,
          startcity: allvipzhuan[i].startcity,
          endcity: allvipzhuan[i].endcity,
          contacts: allvipzhuan[i].contacts,
          phone: allvipzhuan[i].phone,
          comAddr: allvipzhuan[i].addr
        })
      }
    }
  }
})