export interface SignupDTO {
  username: string;
  password: string;
  phoneNumber: string;
  ProfilePicture: string;
  biography?: string | null;
}
export interface profilePicDTO {
  ProfilePicture: string;
}

export interface LoginDTO {
  username: string;
  phoneNumber: string;
  password: string;
}

export interface ValidateTokenDTO {
  token: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
