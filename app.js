//app.js
App({
  globalData: {
    userInfo: null,
    token: null,
    openid : null,
    all_stocks: '000001.XSHE,PAYH,平安银行,stock\n000002.XSHE, WKA, 万科A, stock\n'

  },
  onLaunch: function () {
    console.log(this.globalData.all_stocks.split('\n'))
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录
    wx.login({
      success: res => {
        console.log('get code from wechat' + res.code)
        var that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://qcloud.captainp.cn/api/login',
          data: {
            code: res.code
          },
          method: "POST",
          header: {
            'content-type': "application/json"
          },
          success: function (res) {
            //app.globalData.token = res.data,
            console.log(res.data);
            that.globalData.token = res.data.token;
            that.globalData.openid = res.data.openid;
            
            if(that.indexCallback){
              that.indexCallback(res.data.token);
            }
            
          }
        })
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
  
})