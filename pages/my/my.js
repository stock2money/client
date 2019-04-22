//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'my page',
    userInfo: {},
    hasUserInfo: false,
    canIUse: false
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      wx.login({
        success: function(res) {
          var code = res.code;
          var appId = 'wx25915d3c4f6a78f3';
          var secret = '133e74afeca06c60a597cf3b694a6c87'
          var secret = ''
          console.log(code);
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              var openid = res.data.openid //返回openid
              console.log('openid为' + openid);
            }
          })

        }
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

      wx.login({
        success: function (res) {
          var code = res.code;
          var appId = 'wx25915d3c4f6a78f3';
          var secret = '133e74afeca06c60a597cf3b694a6c87'
          var secret = ''
          console.log(code);
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              var openid = res.data.openid //返回openid
              console.log('openid为' + openid);
            }
          })

        }
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
