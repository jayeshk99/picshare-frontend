export interface IUserData {
  id: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

export interface IImageData {
  id: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  title: string;
  createdBy: string;
  user: IUserData;
}
