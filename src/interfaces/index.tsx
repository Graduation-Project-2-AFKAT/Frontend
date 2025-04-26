export interface IForm {
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

export interface IPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  author: {
    username: string;
    profile_url: string;
  };
  tags: string[];
  created_at: string;
  modified_at: string;
  published_at: string;
}

export interface IGame {
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

export interface IAsset {
  id: number;
  title: string;
  thumbnail: string;
  author: string;
  category: string;
  license: string;
  style: string;
  fileFormat: string;
  likes: number;
  downloads: number;
  price: string;
}

export interface AlertMessages {
  [key: string]: string[] | undefined;
}
