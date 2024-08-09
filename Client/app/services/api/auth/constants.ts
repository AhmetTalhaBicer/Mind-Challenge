export const Auth_Signup = "auth/signup";
export const Auth_ProfilePic = "auth/profile-pic";
export const Auth_Login = "auth/login";
export const Auth_ValidToken = "auth/validate-token";
export const User_Change_Profile = (userId: number) =>
  `user/${userId}/change-profile-picture`;
export const User_Change_Password = (userId: number) =>
  `user/change-password/${userId}`;
