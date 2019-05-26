// pages/collect/collect
const app = getApp()
var stocks = require('../../utils/stocks');
var num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    searchValue: '',
    SCI: 3244.81,
    var_SCI: -1.76,
    rate_SCI: -0.05,
    SHE: 30077.15,
    var_SHE: 140.83,
    rate_SHE: 0.47,
    GEM: 26424.99,
    var_GEM: 40.36,
    rate_GEM: 0.15,
    stocks_data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this
    if(app.globalData.collected){
      var some_stocks = stocks.get_name(app.globalData.collected)
      that.load_data(some_stocks)
    }else{
      wx.request({
        url: 'https://qcloud.captainp.cn/api/stocks/' + app.globalData.openid,
        success: function (res) {
          console.log(res.data.stocks);
          app.globalData.collected = res.data.stocks;
          var some_stocks = stocks.get_name(app.globalData.collected)
          that.load_data(some_stocks)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  load_data: function (some_stocks) {
    //get info
    this.data.stocks_data = []
    var that = this

    //var some_stocks = stocks.get_some_stocks(num)
    console.log(some_stocks)
    var name_arr = []
    var code_arr = []
    var en_arr = []
    for (var i = 0; i < some_stocks.length; i++) {
      var info = some_stocks[i].split(',')
      var code = info[0]
      var name = info[1]
      var en = info[2]
      name_arr.push(name);
      code_arr.push(code);
      en_arr.push(en);
      (function (i) {
        wx.request({
          url: 'https://dataapi.joinquant.com/apis',
          data: {
            method: 'get_price',
            token: app.globalData.token,
            code: code,
            unit: '1d',
            count: 3
          },
          method: "POST",
          header: {
            'content-type': "application/json"
          },
          success: function (res) {
            console.log(res.data)
            //第一行不要
            var d = res.data.split('\n').slice(1)
            var info = d[d.length - 1].split(',')
            var close = d[d.length - 2].split(',')[2];
            var price = info[2]
            var deta = price - close;
            var rate = deta / close * 100

            var obj = new Object()
            obj.c = code_arr[i].split('.')[0]
            obj.code = code_arr[i]
            obj.name = name_arr[i]
            obj.en = en_arr[i]
            obj.price = price
            obj.rate = rate.toFixed(2)
            let stocks_data = that.data.stocks_data;
            console.log(stocks_data)
            stocks_data.push(obj)
            that.setData({
              stocks_data
            })
          }
        })
      })(i);
      console.log(info)
    }
    //000001.XSHG, 399001.XSHE, 399006.XSHE
    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_price',
        token: app.globalData.token,
        code: '000001.XSHG',
        unit: '1d',
        count: 2
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        //第一行不要
        var d = res.data.split('\n').slice(1)
        var info = d[d.length - 1].split(',')
        var close = d[0].split(',')[2];
        var deta = info[2] - close;
        var rate = deta / close * 100
        that.setData({
          'SCI': info[2],
          'var_SCI': deta.toFixed(2),
          'rate_SCI': rate.toFixed(2)
        })
      }
    });

    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_price',
        token: app.globalData.token,
        code: '399001.XSHE',
        unit: '1d',
        count: 2
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        var d = res.data.split('\n').slice(1)
        var info = d[d.length - 1].split(',')
        var close = d[0].split(',')[2];
        var deta = info[2] - close;
        var rate = deta / close * 100
        that.setData({
          'SHE': info[2],
          'var_SHE': deta.toFixed(2),
          'rate_SHE': rate.toFixed(2)
        })
      }
    });

    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_price',
        token: app.globalData.token,
        code: '399006.XSHE',
        unit: '1d',
        count: 2
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        var d = res.data.split('\n').slice(1)
        var info = d[d.length - 1].split(',')
        var close = d[0].split(',')[2];
        var deta = info[2] - close;
        var rate = deta / close * 100
        that.setData({
          'GEM': info[2],
          'var_GEM': deta.toFixed(2),
          'rate_GEM': rate.toFixed(2)
        })
      }
    });

  },

  //得到股票信息
  get_details: function (e) {
    //console.log(app.globalData.token);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id + '&name=' + e.currentTarget.dataset.name,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

})