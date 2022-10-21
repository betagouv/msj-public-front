import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Header from 'shared/components/Dsfr/Header';
import { AuthProvider } from '../shared/hooks/auth-hook';

export default {
  title: 'Headers',
  component: Header,
};

export function newHeader() {
  return (
    <MemoryRouter initialEntries={['/mon-compte']}>
      <AuthProvider>
        <Routes>
          <Route path="/mon-compte" element={<Header />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}
