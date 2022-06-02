export interface SystemState {
  refreshStatus: boolean;
  accessToken: string;
  expires: number;
  theme: 'dark' | 'light';
}

const INIT_STATE: SystemState = {
  refreshStatus: false,
  accessToken: '',
  expires: 0,
  theme: 'light'
};

const system = (state: SystemState = INIT_STATE, action: Record<string, any>): SystemState => {
  switch (action.type) {
    case 'SET_REFRESHSTATUS':
      state.refreshStatus = action.status;
      return {
        ...state
      };
    case 'SET_ACCESSTOKEN':
      return {
        ...state,
        accessToken: action.accessToken
      };
    case 'SET_EXPIRES':
      state.expires = action.expires;
      return {
        ...state
      };
    case 'SET_THEME':
      state.theme = action.theme;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default system;
