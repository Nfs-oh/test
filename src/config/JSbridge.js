import bwmodel from '@/config/bwmodel'

let isAndroid = bwmodel.system === 'Android'
let isiOS = bwmodel.system === 'iPhone'

//这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge(callback) {
  //Android使用
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(window.WebViewJavascriptBridge)
        },
        false
      );
    }
  }

  //iOS使用
  if (isiOS) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    // WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0);
  }
}
//注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge(function (bridge) {
  if (isAndroid) {
    //初始化
    bridge.init(function (message, responseCallback) {
      var data = {
        'Javascript Responds': 'Wee!'
      };
      responseCallback(data);
    })
  }
})

export default {
  jsEvent: {},
  // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
  callHandler(name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  addRegisterHandler(list) {
    if (list && list.length > 0) {
      list.forEach(v => {
        this.jsEvent[v.name] = v.callback
      });
    }
    let jsEvent = this.jsEvent
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler('jsEvent', function (data, responseCallback) {
        data = JSON.parse(data)
        if (jsEvent[data.event]) {
          jsEvent[data.event](data, responseCallback)
        }
      })
    })
  },
  removeRegisterHandler(name) {
    if (this.jsEvent[name]) {
      delete this.jsEvent[name]
    }
  },
  removeAllRegisterHandler() {
    this.jsEvent = {}
  },
  // APP调js方法 （参数分别为:js提供的方法名  回调）
  registerHandler(name, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}