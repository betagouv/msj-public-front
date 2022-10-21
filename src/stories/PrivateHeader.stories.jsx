import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../shared/hooks/auth-hook';

import PrivateHeader from '../shared/components/Header/PrivateHeader';

export default {
  title: 'Headers',
  component: PrivateHeader,
};

export function Private() {
  return (
    <MemoryRouter initialEntries={['/mon-compte']}>
      <AuthProvider>
        <Routes>
          <Route path="/mon-compte" element={<PrivateHeader />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}
