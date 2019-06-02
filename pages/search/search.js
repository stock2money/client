// pages/search/search.js
var stocks = require('../../utils/stocks');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stocks_data: []
    ,
    "if_find":true
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
  get_details: function (e) {
    //console.log(app.globalData.token);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id + '&name=' + e.currentTarget.dataset.name,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  search_input: function (e) {
    console.log(e.detail.value)
    var key = e.detail.value
    if(key == ""){
      this.setData({
        "if_find": true,
        "stocks_data":[]
      })
      return;
    }
    var arr = stocks.search(key)
    if(arr.length == 0){
      this.setData({
        "if_find":false
      })
    }else{
      this.setData({
        "if_find": true
      })
    }
    var stocks_data = []
    for(var i = 0; i < arr.length; i++){
      var obj = new Object()
      obj.code = arr[i][0]
      obj.c = obj.code.split('.')[0]
      obj.name = arr[i][1]
      obj.en = arr[i][2]
      stocks_data.push(obj)
    }
    this.setData({
      stocks_data
    })
    console.log(stocks_data)
    
  }


})