import React, { useMemo } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Header from 'shared/components/Dsfr/Header';
import { AuthContext, AuthProvider } from '../shared/hooks/auth-hook';

export default {
  title: 'Headers',
  component: Header,
};

export function newPrivateHeader() {
  const authData = useMemo(
    () => ({
      user: {
        token: 'abc123',
        tokenExpDate: '',
        firstName: 'bob',
        lastName: 'mortimer',
        phone: '0666778899',
        msjId: '12',
      },
      isLogin: true,
      login: () => new Promise<void>(() => {}),
      logout: () => {},
    }),
    [],
  );
  return (
    <MemoryRouter initialEntries={['/mon-compte']}>
      <AuthContext.Provider value={authData}>
        <Routes>
          <Route path="/mon-compte" element={<Header />} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}
export function newPublicHeader() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}
