export interface IInputs {
  username?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface IUser {
  username: string;
  email: string;
  userProfile: {
    country: string;
    github_link: string;
    linkedin_link: string;
    phone: string;
    profile_image: string;
  };
}

export interface AlertMessages {
  [key: string]: string[] | undefined;
}

export interface IGames {
  id: number | null;
  title: string;
  description: string;
  creator: string;
  user_rating: string;
  tags: string[];
  download_count: number;
  rating: number;
  game_file: string;
  thumbnail: string;
}
