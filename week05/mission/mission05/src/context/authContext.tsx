import { createContext, useContext, type PropsWithChildren } from "react";
import type { LoginRequest } from "../types/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { postSignin, postSignout } from "../apis/auth";
import { LS_KEYS } from "../constants/key";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { value: accessToken, setStoredValue: setAccessToken } =
    useLocalStorage(LS_KEYS.ACCESS);
  const { value: refreshToken, setStoredValue: setRefreshToken } =
    useLocalStorage(LS_KEYS.REFRESH);

  const login = async (signInData: LoginRequest) => {
    try {
      const data = await postSignin(signInData);
      if (!data.status) return false;
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await postSignout();
    } catch (error) {
      console.warn("Signout API failed (ignored).");
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within a AuthProvider");
  return ctx;
};
