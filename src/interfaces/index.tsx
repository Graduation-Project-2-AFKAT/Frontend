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

export interface AlertMessages {
  [key: string]: string[] | undefined;
}
