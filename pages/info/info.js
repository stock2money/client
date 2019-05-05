// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: []
  },

  /**
   * 收缩核心代码
   */
  kindToggle(e) {
    const title = e.currentTarget.id
    console.log(title)
    const news = this.data.news
    for (let i = 0, len = news.length; i < len; ++i) {
      if (news[i].title === title) {
        news[i].open = !news[i].open
      } else {
        news[i].open = false
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://qcloud.captainp.cn/api/news',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        for (let i = 0, len = res.data.length; i < len; ++i) {
            res.data[i].open = false
        } 
        that.setData({
          news: res.data,
        })
      }
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
    console.log("show")
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