import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import {
  postLogin,
  postSignup,
  postValidateToken,
} from "../services/api/auth/endpoints";
import { useMutation } from "react-query";
import {
  LoginDTO,
  SignupDTO,
  ValidateTokenDTO,
} from "../services/api/auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../services/base/index";

interface AuthContextProps {
  handleSignup: (data: SignupDTO) => Promise<unknown>;
  handleLogin: (data: LoginDTO) => Promise<void>;
  handleValidateToken: (data: ValidateTokenDTO) => Promise<unknown>;
  handleLogout: () => void;
  isAuthenticated: boolean;
  user: { username: string; profilePicture: string } | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const signupMutation = useMutation(postSignup);
  const loginMutation = useMutation(postLogin);
  const validateTokenMutation = useMutation(postValidateToken);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{
    username: string;
    profilePicture: string;
  } | null>(null);

  const handleSignup = useMemo(
    () => async (data: SignupDTO) => {
      try {
        const response = await signupMutation.mutateAsync(data);
        return response.data;
      } catch (error) {
        console.error("Signup error:", error);
        throw error;
      }
    },
    [signupMutation]
  );

  const handleLogin = useMemo(
    () => async (data: LoginDTO) => {
      try {
        const response = await loginMutation.mutateAsync(data);
        const token = response.data.result.token;
        const userData = response.data.result.user;
        const profilePictureUrl = `${baseURL}/profile_pics/${userData.profilePicture}`;
        await AsyncStorage.setItem("token", token);
        setIsAuthenticated(true);
        setUser({
          username: userData.username,
          profilePicture: profilePictureUrl,
        });
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [loginMutation]
  );

  const handleValidateToken = useMemo(
    () => async (data: ValidateTokenDTO) => {
      try {
        const response = await validateTokenMutation.mutateAsync(data);
        return response.data;
      } catch (error) {
        console.error("Token validation error:", error);
        throw error;
      }
    },
    [validateTokenMutation]
  );

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const authContextValue = useMemo(
    () => ({
      handleSignup,
      handleLogin,
      handleValidateToken,
      handleLogout,
      isAuthenticated,
      user,
    }),
    [
      handleSignup,
      handleLogin,
      handleValidateToken,
      handleLogout,
      isAuthenticated,
      user,
    ]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
