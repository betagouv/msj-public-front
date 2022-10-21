import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';

import PublicHeader from '../shared/components/Header/PublicHeader';

export default {
  title: 'Headers',
  component: PublicHeader,
};

export function Public() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<PublicHeader />} />
      </Routes>
    </MemoryRouter>
  );
}
