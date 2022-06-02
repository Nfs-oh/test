let bwmodel = {
  font: '2',
  overfont: '2',
  theme: '0',
  system: 'pc',
  app: '',
  version: '',
  initStatus: false,
  changeTextColor: (temp) => {
    if (temp.backgroundColor) {
      let val = temp.backgroundColor.toLowerCase()
      if (['#fff', '#ffffff', 'rgba(255, 255, 255)', 'rgb(255, 255, 255)'].indexOf(val) >= 0) {
        temp.backgroundColor = '#14171f'
      } else if (['#f6f6f6', 'rgba(246, 246, 246)', 'rgb(246, 246, 246)'].indexOf(val) >= 0) {
        temp.backgroundColor = '#0e1014'
      } else {
        temp.backgroundColor = '#14171f'
      }
    } else {
      temp.backgroundColor = '#14171f'
    }
    if (temp.color) {
      let val = temp.color.toLowerCase()
      if (['#333', '#333333', 'rgba(51, 51, 51)', 'rgb(51, 51, 51)'].indexOf(val) >= 0) {
        temp.color = '#ccc'
      } else if (['#666', '#666666', 'rgba(102, 102, 102)', 'rgb(102, 102, 102)'].indexOf(val) >= 0) {
        temp.color = '#999'
      } else if (['#999', '#999999', 'rgba(153, 153, 153)', 'rgb(153, 153, 153)'].indexOf(val) >= 0) {
        temp.color = '#666'
      } else if (['#bbb', '#bbbbbb', 'rgba(187, 187, 187)', 'rgb(187, 187, 187)'].indexOf(val) >= 0) {
        temp.color = '#444'
      } else if (['#ccc', '#cccccc', 'rgba(204, 204, 204)', 'rgb(204, 204, 204)'].indexOf(val) >= 0) {
        temp.color = '#333'
      } else {
        temp.color = '#ccc'
      }
    } else {
      temp.color = '#ccc'
    }
  },
  compareVersion: function(val) {
    if (this.version) {
      let v1 = this.version.split('.')
      let v2 = val.split('.')
      for(let i = 0; i < 3; i ++) {
        if (parseInt(v1[i], 10) > parseInt(v2[i], 10)) {
          return true
        } else if (parseInt(v1[i], 10) < parseInt(v2[i], 10)) {
          return false
        }
      }
      return true
    }
    return false
  }
}
function init() {
  if (bwmodel.initStatus) return
  bwmodel.initStatus = true
  let ua = navigator.userAgent
  // ua = 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36 ValueStorm/3.2.1 font/2 theme/1'
  // ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ValueStorm/3.12.1 font/2 overfont/2 theme/1'
  let matchResult1 = ua.match(/\sfont\/\d/g)
  if (matchResult1) {
    bwmodel.font = matchResult1[0].substring(6, matchResult1[0].length)
  }
  let matchResult2 = ua.match(/\stheme\/\d/g)
  if (matchResult2) {
    bwmodel.theme = matchResult2[0].substring(7, matchResult2[0].length)
  }
  let matchResult3 = ua.match(/\sValueStorm\/\d+\.\d+\.\d+/g)
  if (matchResult3) {
    bwmodel.version = matchResult3[0].substring(12, matchResult3[0].length)
  }
  let matchResult4 = ua.match(/\soverfont\/\d/g)
  if (matchResult4) {
    bwmodel.overfont = matchResult4[0].substring(10, matchResult4[0].length)
  }
  // 判断苹果、安卓、pc
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) { //判断iPhone|iPad|iPod|iOS
    bwmodel.system = 'iPhone'
  } else if (/(Android)/i.test(ua)) {  //判断Android
    bwmodel.system = 'Android'
  }
  // 判断是否在QQ内
  if ((/ QQ/i).test(ua)) {
    bwmodel.app = 'qq'
  }
  // 判断是否在微博内
  if ((/WeiBo/i).test(ua)) {
    bwmodel.app = 'weibo'
  }
  // 判断是否在微信内
  if(/MicroMessenger/i.test(ua)) {
    bwmodel.app = 'weixin'
  }

  // 判断是否在钉钉内
  if((/dingtalk/i).test(ua)){
    bwmodel.app = 'dingtalk'
  }
  
  // 判断是否在市值风云内
  if(/ValueStorm/i.test(ua)) {
    bwmodel.app = 'storm'
  }
}
init()
export default bwmodel