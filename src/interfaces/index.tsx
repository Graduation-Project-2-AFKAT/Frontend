export interface IInputs {
  username?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface IUser {
  username: string;
  email: string;
  avatar: string;
  token: {
    access: string;
    refresh: string;
  };
}

export interface IFormData {
  title: string;
  description: string;
  genre: string[];
  releaseDate: string;
  version: string;
  price: string;
  tags: string[];
  isMultiplayer: boolean;
}
