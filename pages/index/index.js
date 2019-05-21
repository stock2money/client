//index.js
//获取应用实例
const app = getApp()
var intervalId = 0;
var num = 0;
var stocks = require('../../utils/stocks');
Page({

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

  onLoad: function (options) {
    console.log('onLoad index')
    var that = this;
  
    /*
    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_token',
        mob: '13690674730',
        pwd: '123456'
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        app.globalData.token = res.data,
        console.log(app.globalData.token);
        
        that.load_data();
      }
    })*/

    /**
     * 必须先获得token
     * 网络请求可能是后得到token
     * 因此要定义一个回调函数
     * App页面在请求success后判断时候有Page页面定义的回调方法
     * 如果有就执行该方法
     * 因为回调函数是在Page里面定义的所以方法作用域this是指向Page页面
     */

    if(app.globalData.token && app.globalData.token != ''){
      //token准备好了
      
      this.load_data()
    }else{
      //还没有token，等待回调
      app.indexCallback = token => {
        console.log('get token successfully ' +token);
        this.load_data()
      }    
    }

    
    
  },

  onReady: function () {
    console.log('onReady')
    
  },

  onShow: function () {
    // console.log(app.globalData.token);
    console.log("onShow")

    this.setData({ searchValue: '' })
    console.log('onshow index')
    this.startTimer();
  },

  onHide: function () {
    //停止计时
    console.log('onhide index')
    this.stopTimer();
  },

  startTimer: function () {
    var that = this;
    //3秒更新一次
    var interval = 3 * 1000;
    intervalId = setInterval(function () {
      //that.load_data();
      console.log('update');
    }, interval);

  },

  //停止计时
  stopTimer: function () {
    clearInterval(intervalId);
    intervalId = 0
  },

  load_data:function(){
    
    //指数
    /*
    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_all_securities',
        token: app.globalData.token,
        code: 'stock'
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        
        console.log(res.data.split('\n').length)
        //console.log(JSON.stringify(res.data))
      }
    });
    */

    //get info
    var that = this
    var some_stocks = stocks.get_some_stocks(num)
    console.log(some_stocks)
    var name_arr = []
    var code_arr = []
    var en_arr = []
    for(var i = 0; i < some_stocks.length; i++){
      var info = some_stocks[i].split(',')
      var code = info[0]
      var name = info[1]
      var en = info[2]
      name_arr.push(name);
      code_arr.push(code);
      en_arr.push(en);
      (function(i) {wx.request({
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
      })})(i);
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
    //console.log(app.globalData.token);
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.id+'&name='+e.currentTarget.dataset.name,
      success: function (res) { },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //上证指数信息，id为000001.XSHG
  HSI_detail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id=000001.XSHG' + '&name=上证指数',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //深证成指，id为399001.XSHE
  SCI_detail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=399001.XSHE'+'&name=深证成指',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //创业板指信息，id为399006.XSHE
  GEM_detail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id=399006.XSHE'+'&name=创业板指',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
})
