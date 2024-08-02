import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { postSignup } from "../services/api/auth/endpoints";
import { useMutation } from "react-query";
import { SignupDTO } from "../services/api/auth/types";

interface AuthContextProps {
  handleSignup: (data: SignupDTO) => Promise<unknown>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const signupMutation = useMutation(postSignup);

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

  const authContextValue = useMemo(
    () => ({
      handleSignup,
    }),
    [handleSignup]
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
