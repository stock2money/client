//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus: false,
    inputVale: '',
    SCI: 3244.81,
    var_SCI: -1.76,
    rate_SCI: -0.05,
    HSI: 30077.15,
    var_HSI: 140.83,
    rate_HSI: 0.47,
    DJIA: 26424.99,
    var_DJIA: 40.36,
    rate_DJIA: 0.15,

    stocks_data: [{
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '腾讯控股',
      price: 391.800,
      rate: -0.51
    }, {
      code: '00700',
      name: '金山软件',
      price: 391.800,
      rate: 0.51
    }]
  },

  

  search_input:function(e){
    console.log(e.detail.value)
  }
  
})
