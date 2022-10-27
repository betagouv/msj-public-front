import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import Header from 'shared/components/Dsfr/Header';
import { useAuth } from '../hooks/auth-hook';

function ProtectedLayout() {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/connexion" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
