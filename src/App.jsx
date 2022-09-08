import React from 'react';

import { Outlet } from 'react-router-dom';
import Banner from './shared/components/Banner/Banner';

function App() {
  return (
    <>
      <Banner />
      <Outlet />
    </>
  );
}

export default App;
