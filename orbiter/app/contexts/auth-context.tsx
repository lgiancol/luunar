import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '~/services/auth/auth.model';
import { logoutUser, validateUser } from '~/services/auth/auth.service';
import { isResultSuccess } from '~/types/result';

interface IAuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in when the app loads
    validateUser()
      .then((result) => {
        if (isResultSuccess(result)) {
          setUser(result.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    //   .catch((e) => {
    //     // Navigate to the login page...
    //     console.log('Navigate to login page');
    //   });
  }, []);

  const login = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
  };

  const logout = () => {
    logoutUser().then((result) => {
      if (result) {
        setUser(null);
      }
    });
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{!loading && children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
