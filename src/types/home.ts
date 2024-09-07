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
  post?: Omit<IImageData, 'user'>;
  favourites: IPostFavourite[];
}

export interface IPostFavourite {
  userId: string;
  postId: string;
}
export interface IFavouriteData {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  user: IUserData;
  post: Omit<IImageData, 'user'>;
}

export type CardType = 'home' | 'favourite';
