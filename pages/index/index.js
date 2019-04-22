//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus: false,
    searchValue: '',
    SCI: 3244.81,
    var_SCI: -1.76,
    rate_SCI: -0.05,
    HSI: 30077.15,
    var_HSI: 140.83,
    rate_HSI: 0.47,
    DJIA: 26424.99,
    var_DJIA: 40.36,
    rate_DJIA: 0.15,

    stocks_data: [{
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: 0.51

    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: 0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '金山软件',
      price: 391.800,
      rate: 0.51
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onShow: function () {
    this.setData({ searchValue: '' })
  },
  
  go_search:function(e){
    
    wx.navigateTo({
      url: '/pages/search/search',
    })
    
  },

  search_input:function(e){
    console.log(e.detail.value)
  },

  //得到股票信息
  get_details:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id=my_id',
      success: function (res) { },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //上证指数信息，id为0
  HSI_detail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id=0',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //恒生指数，id为1
  SCI_detail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=1',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //道琼斯指数信息，id为2
  DIJA_detail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id=2',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
})
