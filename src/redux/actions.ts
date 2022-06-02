import bridge from '@/config/JSbridge';
import bwmodel from '@/config/bwmodel';
import moment from 'moment';
import { KJUR } from 'jsrsasign';
import store from './index';
import { Dispatch } from 'redux';
import { userInfo, refreshAccessToken } from '@/types/index';

let nextTodoId = 0;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});
// user相关的actions
export const setUserInfo = () => {
  return (dispatch: Dispatch) =>
    new Promise((resolve) => {
      if (bwmodel.app === 'storm') {
        bridge.callHandler(
          'nativeEvent',
          {
            event: 'userInfo',
            params: {}
          },
          (res: string) => {
            const result: { code: number; params: userInfo } = JSON.parse(res);
            if (result.code === 0) {
              if (result.params) {
                const info: Record<string, string | boolean | number> = {
                  userId: result.params.userId,
                  userName: result.params.userName,
                  avatar: result.params.avatarUrl,
                  authLevel: result.params.authLevel,
                  autoLoadResource:
                    typeof result.params.autoLoadResource !== 'undefined'
                      ? result.params.autoLoadResource
                      : true,
                  accessToken: result.params.accessToken || '',
                  deviceNo: result.params.deviceNo || '',
                  deviceType: encodeURIComponent(result.params.deviceType) || '',
                  systemVersion: result.params.systemVersion || ''
                };
                if (result.params.accessToken) {
                  const jws = new KJUR.jws.JWS();
                  jws.parseJWS(result.params.accessToken);
                  const accessObj = KJUR.jws.JWS.readSafeJSONString(jws.parsedJWS.payloadS);
                  const accessTokenExp = moment(accessObj.expirationWithTimeZone)
                    .subtract(5, 'minute')
                    .valueOf();
                  info.expires = accessTokenExp || '';
                }
                if (result.params.userType) {
                  info.userType = result.params.userType;
                }
                dispatch(getUserInfo(info));
                resolve('');
              }
              resolve('');
            }
            resolve('');
          }
        );
      }
      resolve('');
    });
};
export const getUserInfo = (user: Partial<userInfo>) => ({
  type: 'SET_USER_INFO',
  user
});
// 刷新token
export const refreshToken = () => {
  return (dispatch: Dispatch) => {
    dispatch(setRefreshstatus(true));
    return new Promise((resolve) => {
      bridge.callHandler(
        'nativeEvent',
        {
          event: 'refreshAccessToken',
          params: {}
        },
        (res: string) => {
          const result: { code: number; params: refreshAccessToken } = JSON.parse(res);

          if (result.code === 0) {
            dispatch(setAccesstoken(result.params.accessToken));
            if (result.params.accessToken) {
              const jws = new KJUR.jws.JWS();
              jws.parseJWS(result.params.accessToken);
              const accessObj = KJUR.jws.JWS.readSafeJSONString(jws.parsedJWS.payloadS);
              const accessTokenExp = moment(accessObj.expirationWithTimeZone).subtract(5, 'minute').valueOf();
              dispatch(setExpires(accessTokenExp));
            } else {
              dispatch(setExpires(0));
            }
          }
          dispatch(setRefreshstatus(false));
          resolve('');
        }
      );
    });
  };
};
export const setRefreshstatus = (status: boolean) => ({
  type: 'SET_REFRESHSTATUS',
  status: status
});
export const setActoken = (data: refreshAccessToken) => (dispatch: Dispatch) => {
  dispatch(setAccesstoken(data.accessToken || ''));
  dispatch(setExpires(data.expires || 0));
};
export const setAccesstoken = (accesstoken: string) => ({
  type: 'SET_ACCESSTOKEN',
  accessToken: accesstoken
});
export const setExpires = (expires: number) => ({
  type: 'SET_EXPIRES',
  expires: expires
});
export const changeRefreshToken = () => {
  return () => {
    const state = store.getState();
    return new Promise((resolve) => {
      const lunxun = setInterval(() => {
        if (!state.user.refreshStatus) {
          clearInterval(lunxun);
          resolve('');
        }
      }, 50);
    });
  };
};

export const setTheme = (data) => ({
  type: 'SET_THEME',
  theme: data
});
