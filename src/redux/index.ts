import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { getDeviceNo } from 'utils';

const initState = {
  user: {
    userId: '',
    theme: 'light',
    userType: '', // 1-游客用户（跳登录）、2-未绑定手机受限用户（跳绑定手机）
    userName: '',
    font: '2',
    overfont: '2',
    avatar: '',
    authLevel: '',
    connectionType: 'wifi',
    autoLoadResource: true,
    accessToken: '',
    deviceNo: getDeviceNo(),
    deviceType: '',
    systemVersion: '',
    expires: '',
    refreshStatus: false
  }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initState, composeEnhancers(applyMiddleware(thunk)));

export default store;
