// AuthContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  postLogin,
  postSignup,
  postValidateToken,
} from "../services/api/auth/endpoints";
import { useMutation } from "react-query";
import { LoginDTO, SignupDTO } from "../services/api/auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../services/base/index";

interface AuthContextProps {
  handleSignup: (data: SignupDTO) => Promise<unknown>;
  handleLogin: (data: LoginDTO) => Promise<void>;
  handleValidateToken: (token: string) => Promise<void>;
  handleLogout: () => void;
  isAuthenticated: boolean;
  user: { userId: string; username: string; profilePicture: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      userId: string;
      username: string;
      profilePicture: string;
    } | null>
  >;
  loading: boolean; // Add loading state
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
    userId: string;
    username: string;
    profilePicture: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Set initial loading state

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          await handleValidateToken(token);
        } else {
          console.log("No token found"); // Debugging line
          handleLogout();
        }
      } catch (error) {
        console.error("Error checking token:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

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
          userId: userData.userId,
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
    () => async (token: string) => {
      try {
        const response = await validateTokenMutation.mutateAsync({ token });
        const userData = response.data.user;
        if (response.data.success) {
          setIsAuthenticated(true);
          setUser({
            userId: userData.id,
            username: userData.username,
            profilePicture: `${baseURL}/profile_pics/${userData.profilePicture}`,
          });
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsAuthenticated(false);
        handleLogout();
      }
    },
    [validateTokenMutation]
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const authContextValue = useMemo(
    () => ({
      handleSignup,
      handleLogin,
      handleValidateToken,
      handleLogout,
      isAuthenticated,
      user,
      setUser,
      loading, // Provide loading state
    }),
    [
      handleSignup,
      handleLogin,
      handleValidateToken,
      handleLogout,
      isAuthenticated,
      user,
      setUser,
      loading, // Include loading state
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
