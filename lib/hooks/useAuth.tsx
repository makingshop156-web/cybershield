"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { ENABLE_AUTH } from "@/lib/auth/config";
import { authService } from "@/lib/auth/auth-service";
import type { AuthUser } from "@/lib/auth/types";

interface AuthContext {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthContext>({
  user: null, loading: true,
  login: async () => null, register: async () => null, logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ENABLE_AUTH) { setLoading(false); return; }
    authService.getCurrentUser().then((u) => { setUser(u); setLoading(false); });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    const { user: u, error } = await authService.login(email, password);
    if (error) return error;
    setUser(u);
    return null;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<string | null> => {
    const { user: u, error } = await authService.register(email, password, name);
    if (error) return error;
    setUser(u);
    return null;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
