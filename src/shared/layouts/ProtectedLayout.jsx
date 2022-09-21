import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import PrivateHeader from 'shared/components/Banner/PrivateHeader';
import { useAuth } from '../hooks/auth-hook';

function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
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
