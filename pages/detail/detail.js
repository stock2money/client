// pages/detail/detail.js
//获取应用实例
const app = getApp()
var storage = require('../../utils/storage');
var kl = require('../../utils/KLineView/k-line');

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
    canvasIndex : 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id'+options['id'])
    console.log('token' + app.globalData.token)
    var token = app.globalData.token
    //请求数据
    var param = {
      method: 'get_price',
      token: token
    }
    wx.request({ 
      url: 'https://dataapi.joinquant.com/apis',
      data: {
        method: 'get_price',
        token: token,
        code: '600000.XSHG',
        count: 100,
        unit: '1d',       
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        //console.log(res.data)
        
        var data = res.data.split('\n')

       //console.log(data.length)
        for(var i = 1; i < data.length; i++){
            //console.log(data[i])
          var arr = data[i].split(',')
          for(var j = 0; j < arr.length; j++){
            //console.log(arr[j]);
          }
        }
        
      }
    })

    //day
    this.tabChart({
      target: {
        dataset: {
          type: 'dk'
        }
      }
    });

  },

  tabChart: function (e) {
    var type = e.target.dataset.type;
    var getDataByType = function (type) {
      return {
        'dk': function () {
          return storage.getDkData();
        },
        'wk': function () {
          return storage.getWkData();
        },
        'mk': function () {
          return storage.getMkData();
        }
      }[type]();
    };
    var data = getDataByType(type);
    console.log(data)
    var d = {"data":data.data,"v":1}
    
    console.log(d)
    console.log(type)
    
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
    let index = e.currentTarget.dataset.index
    let period = 1
    var canvasIndex = 0

    switch (index) {
      case "0":
        period = 1;
        canvasIndex = 0
        break;
      case "1":
        period = 100;
        canvasIndex = 1
        break;
      case "2":
        period = 101;
        canvasIndex = 2
        break;
      case "3":
        period = 102;
        canvasIndex = 3
        break;
      case "4":
        period = 60;
        canvasIndex = 4
        break;
    }

    this.setData({
      currentPeriodIndex: index,
      quotePeriod: period,
      quoteData: {
        canvasIndex: canvasIndex
      }
    })

  },
})


