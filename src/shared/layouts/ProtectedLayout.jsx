import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import PrivateHeader from 'shared/components/Header/PrivateHeader';
import { useAuth } from '../hooks/auth-hook';

function ProtectedLayout() {
  const { user } = useAuth();

  if (!user || new Date(user.tokenExpDate) < new Date()) {
    return <Navigate to="/connexion" />;
  }

  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
