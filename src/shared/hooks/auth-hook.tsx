import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'shared/hooks/localstorage-hook';

interface User {
  tokenExpDate: string;
  token: string;
  firstName: string;
  lastName: string;
  phone: string;
  msjId: string;
}
interface AuthData {
  login: (data: User) => Promise<void>;
  logout: () => void;
  user: User | null;
  isLogin: boolean;
}
export const AuthContext = createContext<AuthData>({
  user: null,
  isLogin: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data) => {
    const userData = data;
    const tokenExpDate = data.tokenExpDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    userData.tokenExpDate = tokenExpDate.toISOString();

    setUser({ ...userData });
    navigate('/mon-compte/mes-convocations');
  };

  const logout = () => {
    setUser(null, () => {
      navigate('/connexion', { replace: true });
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isLogin: user && new Date(user.tokenExpDate) > new Date(),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
