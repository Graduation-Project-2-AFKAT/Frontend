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
  followers_count: number;
  following_count: number;
  is_following: boolean;
}

export interface IMembership {
  role: "developer" | "designer" | "admin";
  experience: string;
  portfolio: string;
  skills: string[];
  motivation: string;
  references: string;
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
  user_id: number;
  title: string;
  description: string;
  username: string;
  user_rating: number;
  tags: string[];
  download_count: number;
  rating: number;
  game_file: string;
  thumbnail: string;
  comments: string[];
}

export interface IAchievement {
  id: number;
  playerId: number;
  achievementId: number;
  gameId: number;
  achievementName: string;
  achievementDescription: string;
  isCompleted: boolean;
  achievementIconURL: string;
  dateAchieved: string;
}

export interface ILeaderboard {
  id: number;
  gameId: number;
  leaderboardName: string;
}

// export interface IAchievement {
//   id: number;
//   gameId: number;
//   name: string;
//   description: string;
//   imageUrl: string;
// }

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

export interface IComment {
  id: number;
  game?: number;
  art?: number;
  user: number;
  content: string;
  username: string;
  created_at: string;
  updated_at: string;
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
  game_jam_thumbnail: string;
  isOnline: boolean;
  location: string;
}

export interface AlertMessages {
  [key: string]: string[] | undefined;
}
