"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserProfile,
  DEMO_CREDENTIALS,
  getStoredUser,
  loginApi,
  registerApi,
  updateProfileApi,
  logoutApi,
  AUTH_CHANGE_EVENT,
} from "../services/auth-service";

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sinkronisasi inisial dari browser storage
    setUser(getStoredUser());
    setIsLoaded(true);

    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ user: UserProfile | null }>;
      setUser(customEvent.detail?.user ?? getStoredUser());
    };

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    window.addEventListener("storage", () => setUser(getStoredUser()));

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
      window.removeEventListener("storage", () => setUser(getStoredUser()));
    };
  }, []);

  const login = useCallback(async (email: string, password = "password123") => {
    const res = await loginApi(email, password);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password?: string;
      experienceLevel?: "Pemula" | "Menengah" | "Mahir";
      preferredSectors?: string[];
      bio?: string;
    }) => {
      const res = await registerApi({
        ...data,
        password: data.password || "password123",
      });
      setUser(res.user);
      return res.user;
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updated: Partial<UserProfile>) => {
    const res = await updateProfileApi(updated);
    setUser(res);
    return res;
  }, []);

  const quickDemoLogin = useCallback(async () => {
    return login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
  }, [login]);

  return {
    user,
    isLoaded,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
    quickDemoLogin,
  };
}
