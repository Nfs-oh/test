export interface UserState {
  userId: string;
  userName: string;
  avatar: string;
  authLevel: string;
  autoLoadResource: boolean;
  accessToken: string;
  deviceNo: string;
  deviceType: string;
  systemVersion: string;
}

const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
};

export default user;
