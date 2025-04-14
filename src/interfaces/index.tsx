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

export interface IAddGameFormData {
  title: string;
  description: string;
  releaseDate: string;
  version: string;
  price: string;
  tags: string[];
  isMultiplayer: boolean;
}

export interface GameJamType {
  id: string;
  title: string;
  status: "active" | "upcoming" | "past";
  theme?: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  participants: number;
  maxParticipants?: number;
  image: string;
  description: string;
  prizes: {
    position: string;
    prize: string;
  }[];
  organizer: {
    name: string;
    logo: string;
  };
}

export interface IAddArtFormData {
  title: string;
  description: string;
  category: string[];
  fileFormat: string;
  license: string;
  price: string;
  tags: string[];
}

export interface IMembershipFormData {
  role: "developer" | "designer" | "admin";
  experience: string;
  portfolio: string;
  skills: string[];
  motivation: string;
  references: string;
}

export interface AlertMessages {
  [key: string]: string[] | undefined;
}
