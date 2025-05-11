export interface IForm {
  username?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface IUser {
  id: number;
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

export interface IPost {
  id: number;
  user_id: number;
  username: string;
  user_profile_image: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  theme: string;
  theme_zoom_number: number;
  tags: string[];
  created_at: string;
  modified_at: string;
  published_at: string;
}

export interface IGame {
  id: number;
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

export interface IJam {
  id: number;
  title: string;
  description: string;
  created_by: string;
  start_date: string;
  end_date: string;
  theme: string;
  prizes: string;
  participants: string[];
  participants_count: number;
  is_active: boolean;
}

export interface IAsset {
  id: number;
  user_id: number;
  author: string;
  title: string;
  description: string;
  thumbnail: string;
  model_file: string;
  download_count: number;
  tags: string[];
  created_at: string;
  preview_image: string;
}

export interface AlertMessages {
  [key: string]: string[] | undefined;
}
