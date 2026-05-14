import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "voliere_baay_pitaq_demo_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const login = useCallback((email) => {
    const trimmed = email?.trim();
    if (!trimmed) return false;
    const u = {
      email: trimmed,
      nom: "Thiémokho (Baay Pitàq)",
    };
    setUser(u);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/** @returns {{ user: object | null, login: (email: string) => boolean, logout: () => void, isAuthenticated: boolean }} */
// eslint-disable-next-line react-refresh/only-export-components -- hook lié au provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return ctx;
}
