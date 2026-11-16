"use client";

import { useState, useCallback } from "react";
import {
  UserProfile,
  DEFAULT_USER,
  getStoredUser,
  saveStoredUser,
  clearStoredUser,
} from "../services/auth-service";

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [isLoaded] = useState(true);

  const login = useCallback((email: string, name?: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      name: name || (email.split("@")[0].toUpperCase() || "Investor BEI"),
    };
    saveStoredUser(newUser);
    setUser(newUser);
  }, []);

  const register = useCallback((data: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      ...data,
      name: data.name || "Investor Baru",
      email: data.email || "investor@beistockinsight.id",
      joinedDate: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
    };
    saveStoredUser(newUser);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback((updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const merged: UserProfile = {
        ...(prev || DEFAULT_USER),
        ...updated,
      };
      saveStoredUser(merged);
      return merged;
    });
  }, []);

  return {
    user,
    isLoaded,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
  };
}
