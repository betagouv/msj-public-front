import React, { createContext, useContext, useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'shared/hooks/localstorage-hook';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate('/profile');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
