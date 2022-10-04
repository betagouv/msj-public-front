import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import PublicHeader from 'shared/components/Header/PublicHeader';
import { useAuth } from '../shared/hooks/auth-hook';

function HomePage() {
  const { user } = useAuth();

  if (user && new Date(user.tokenExpDate) > new Date()) {
    return <Navigate to="/mon-compte/mes-rendez-vous" />;
  }

  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
}

export default HomePage;
