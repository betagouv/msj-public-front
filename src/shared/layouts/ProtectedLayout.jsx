import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import PrivateBanner from 'shared/components/Banner/PrivateBanner';
import { useAuth } from '../hooks/auth-hook';

function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  return (
    <>
      <PrivateBanner />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
