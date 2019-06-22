// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    title: '',
    detail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let object = JSON.parse(options.object)
    var tempStr = object.detail
    var i = 0
    for(i=0; i<tempStr.length; i++) {
      if(tempStr.charAt(i) == '@') {
        tempStr = tempStr.slice(0, i)+'\n'+tempStr.slice(i+1)
      }
    }
    console.log(tempStr)
    this.setData({
      time: object.time,
      title: object.title,
      detail: tempStr
    })
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

  }
})