// pages/info/info.wxml
Page({
  /**
  * 页面的初始数据
  */
  data: {
    from: 0,
    to: 20,
    news: []
  },
 
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://qcloud.captainp.cn/api/news?from=' + this.data.from + '&to=' + this.data.to,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          news: res.data["data"],
        })
      }
    })
  },
  
  // 资讯
  jumpDetails: function (e) {
    let index = e.currentTarget.id
    console.log(this.data.news[index])
    wx.navigateTo({
      url: '/pages/new/new?object=' + JSON.stringify(this.data.news[index]),
      success: function(res) {
        // success
      },

      fail: function () {        
        // fail
      },
      
      complete: function() {
        // complete
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
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://qcloud.captainp.cn/api/news?from=0&to=20',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        that.setData({
          news: res.data["data"],
        });
        console.log(res);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  
  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: 'https://qcloud.captainp.cn/api/news?from=' + this.data.to + '&to=' + (this.data.to + 10)
,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 设置数据
        that.setData({
          news: that.data.news.concat(res.data["data"])
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },
})

