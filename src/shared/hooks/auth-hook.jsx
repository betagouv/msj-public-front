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
    console.log('on se loggue');
    setUser({ data });
    navigate('/mon_compte/appointments');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/sign_in', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  console.log('value', value);

  AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
