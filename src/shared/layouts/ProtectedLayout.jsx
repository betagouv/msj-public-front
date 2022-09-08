import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import PrivateBanner from 'shared/components/Banner/PrivateBanner';
import { useAuth } from '../hooks/auth-hook';

function ProtectedLayout() {
  const user = useAuth();

  console.log(user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <PrivateBanner />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
