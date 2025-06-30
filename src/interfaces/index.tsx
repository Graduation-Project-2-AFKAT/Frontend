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
  likes_count: number;
  is_liked_by_user: boolean;
  user_is_following: boolean;
  image: string;
  theme: string;
  theme_zoom_number: number;
  tags: string[];
  created_at: string;
  modified_at: string;
  published_at: string;
  comments?: IPostComment[];
}

export interface IPostComment {
  id: number;
  creator: string;
  content: string;
  modified_at: string;
  created_at: string;
}

export interface IGame {
  id: number;
  user_id: number;
  username: string;
  title: string;
  description: string;
  user_rating: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  download_count: number;
  rating: number;
  thumbnail: string;
  game_file: string;
  game_file_win: string;
  webgl_index_path: string;
  // comments: string[];
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

export interface ILeaderboardEntry {
  userId: number;
  playerName: string;
  score: number;
  rank: number;
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
  user_id: number;
  username: string;
  content: string;
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
