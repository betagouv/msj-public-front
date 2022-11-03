import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import Header from 'shared/components/Dsfr/Header';
import { useAuth } from '../shared/hooks/auth-hook';

function HomePage() {
  const { user } = useAuth();

  if (user && new Date(user.tokenExpDate) > new Date()) {
    return <Navigate to="/mon-compte/mes-rendez-vous" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HomePage;
