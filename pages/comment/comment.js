// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.code = options['code']
    console.log(this.code)
    wx.setNavigationBarTitle({
      title: options['name'],
      size: 15
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

  },
  submit_comment:function(e){
    console.log(e.detail.value.content)
    console.log(app.globalData.userInfo.avatarUrl)
    if(e.detail.value.content == ''){
      return
    }
    wx.request({
          url: 'https://qcloud.captainp.cn/api/stock/'+this.code+'/comment',
          data: {
            nickname: app.globalData.userInfo.nickName,
            detail: e.detail.value.content,
            avatar: app.globalData.userInfo.avatarUrl
          },
          method: "POST",
          header: {
            'content-type': "application/json"
          },
          success: function (res) {
            //app.globalData.token = res.data,
            console.log(res.data);
          
          }
      })
    wx.navigateBack()
  }
})