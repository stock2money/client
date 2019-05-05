// pages/detail/detail.js
//获取应用实例
const app = getApp()
var storage = require('../../utils/storage');
var kl = require('../../utils/KLineView/k-line');

// 设置第一幅图选项
var getOptionKline1 = function (type) {
  return {
    name: type || 'dk',
    width: 'auto',
    height: 160,
    average: [5, 10, 20],
    axis: {
      row: 4,
      col: 5,
      showX: false,
      showY: true,
      showEdg: true,
      paddingTop: 0,
      paddingBottom: 1,
      paddingLeft: 0,
      paddingRight: 0,
      color: '#cdcdcd'
    },
    xAxis: {
      data: [],
      averageLabel: []
    },
    yAxis: [],
    callback: function (time) {
      var page = getCurrentPages();
      page = page[page.length - 1];
      page.setData({
        kl1RenderTime: time
      });
    }
  };
};
//设置第二幅图选项
var getOptionKline2 = function (type) {
  return {
    name: type || 'dk',
    width: 'auto',
    height: 80,
    average: [5, 10, 20],
    axis: {
      row: 1,
      col: 5,
      showX: false,
      showY: true,
      showEdg: true,
      paddingTop: 20,
      paddingBottom: 14,
      paddingLeft: 0,
      paddingRight: 0,
      color: '#cdcdcd'
    },
    xAxis: {
      times: [],
      data: [],
      averageLabel: []
    },
    yAxis: [],
    callback: function (time) {
      var page = getCurrentPages();
      page = page[page.length - 1];
      page.setData({
        kl2RenderTime: time
      });
    }
  };
};

var kLine, kLineB;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "code": null,
    "currentPeriodIndex": 1,
    "unit":null,
    "type": null,
    "dataset": {
      "info":{
        "price":'',
        "deta":'',
        "rate":'',
        "open": '',
        "close": '',
        "volume": '',
        "high": '',
        "low": '',
        "volumn": '',
        "money": ''
      },
      "data":null
    
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options['name'],
      size: 15
    })
    this.data.type = 'dk'
    this.data.unit = '1d'
    this.code = options['id']
    console.log('id'+options['id'])
    this.getBasic()
    this.getData()

  },
  onShow: function(){
    console.log('onShow detail')
  },

  getBasic: function () {

    var token = app.globalData.token;
    //请求数据
    var that = this;

    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_price',
        token: token,
        code: that.code,
        count: 2,
        unit: '1d',
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        //console.log(res.data)
        //第一行不要
      
        var d = res.data.split('\n').slice(1)
        that.data.dataset.data = d;
        var info = d[d.length - 1].split(',')
        var close = d[0].split(',')[2];
        var deta = info[2]-close;
        var rate = deta/close*100
        that.setData({
          'dataset.info.open': info[1],
          'dataset.info.close': close,
          'dataset.info.rate': rate.toFixed(2),
          'dataset.info.deta': deta.toFixed(2),
          'dataset.info.price': info[2],
          'dataset.info.high': info[3],
          'dataset.info.low': info[4],
          'dataset.info.volume': (info[5] / (10 ** 8)).toFixed(2),
          'dataset.info.money': (info[6] / (10 ** 8)).toFixed(2)
        })
      }
    })
  },

  getData: function(){
    
    var token = app.globalData.token;
    //请求数据
    var that = this;

    wx.request({
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_price',
        token: token,
        code: that.code,
        count: 100,
        unit: that.data.unit,
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        //console.log(res.data)
        //第一行不要
        var d = res.data.split('\n').slice(1)
        that.data.dataset.data = d;
        //console.log(that.data.dataset)
        //console.log(data.length)
        //console.log(that.data.type)
        that.tabChart({
          target: {
            dataset: {
              type: that.data.type
            }
          }
        });

      }
    })
  },

  /**
   * 设置类型
   */
  tabChart: function (e) {
    var type = e.target.dataset.type;
    //var data = getDataByType(type);

    var d = this.data.dataset  
    this.draw(d, type);
  },

  draw: function (data, type) {
    kLine = kl('k-line').init(getOptionKline1(type));
    kLine.metaData1(data, getOptionKline1(type));
    kLine.draw();

    kLineB = kl('k-line-b').init(getOptionKline2(type));
    kLineB.metaData2(data, getOptionKline2(type));
    kLineB.draw();
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

  /*
  选择k线类型
  */
  onPeriodSelectorClick: function (e) {
    var index = e.currentTarget.dataset.index
    //console.log(index)
    var type = null
    var unit = null
    switch (index) {
      case "0":
        type = 'hk';
        unit = '60m';
        break;
      case "1":
        type = "dk";
        unit = "1d";
        break;
      case "2":
        type = "wk";
        unit = "1w";
        break;
      case "3":
        type = "mk";
        unit = "1M";
        break;
      case "4":
        type = "mink";
        unit = "30m";
        break;
    }

    this.setData({
      type: type,
      currentPeriodIndex: index,
      unit: unit
    })

    this.getData()

  },
})


