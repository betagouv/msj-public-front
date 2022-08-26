import React from 'react';

import { Outlet } from 'react-router-dom';
import Banner from './components/Banner/Banner';

function App() {
  return (
    <>
      <Banner />
      <Outlet />
    </>
  );
}

export default App;
