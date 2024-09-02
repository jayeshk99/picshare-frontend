export interface LoginResponse {
  statusCode: number;
  data: UserData;
}

export interface UserData {
  userId: string;
  userName: string;
}
