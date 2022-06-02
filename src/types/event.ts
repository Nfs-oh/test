export interface userInfo {
  accessToken: string;
  authLevel: string;
  autoLoadResource: boolean;
  avatarUrl: string;
  connectionType: string;
  deviceNo: string;
  deviceType: string;
  expires: number;
  introduce: string;
  persionalPageImg: string;
  phone: string;
  sex: string;
  status: string;
  systemVersion: string;
  userId: string;
  userName: string;
  userSignal: string;
  userType: string;
}

export interface refreshAccessToken {
  accessToken: string;
  expires: number;
}
