import http from "../../base";
import { Auth_Login, Auth_ProfilePic, Auth_Signup } from "./constants";
import { LoginDTO, SignupDTO } from "./types";

export const postSignup = async (data: SignupDTO) => {
  try {
    const response = await http.post(Auth_Signup, data);
    return response;
  } catch (error: any) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

export const postProfilePic = async (profilePicUri: string) => {
  const response = await fetch(profilePicUri);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append("ProfilePicture", blob, "ProfilePicture.jpg");

  try {
    const response = await http.post(Auth_ProfilePic, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.fileName;
  } catch (error: any) {
    console.error(
      "Profile pic upload error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postLogin = async (data: LoginDTO) => {
  return http.post(Auth_Login, data);
};
