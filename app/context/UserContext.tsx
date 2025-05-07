"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User, token: string, rememberMe: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("token") ? localStorage : sessionStorage;
    const token = storage.getItem("token");
    const username = storage.getItem("username");

    if (token && username) {
      setUser({ username });
    }

    setIsHydrated(true);
  }, []);

  const login = (user: User, token: string, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("username", user.username);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setUser(null);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};