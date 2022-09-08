import React from 'react';

import { Outlet } from 'react-router-dom';
import PublicBanner from 'shared/components/Banner/PublicBanner';

function HomePage() {
  return (
    <>
      <PublicBanner />
      <Outlet />
    </>
  );
}

export default HomePage;
