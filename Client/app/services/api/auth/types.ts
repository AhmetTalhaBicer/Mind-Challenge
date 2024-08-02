export interface SignupDTO {
  username: string;
  password: string;
  ProfilePicture: string;
  biography?: string | null;
}
export interface profilePicDTO {
  ProfilePicture: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}
