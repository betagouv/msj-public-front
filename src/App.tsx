/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import Login from 'pages/Login';
import AcceptInvitation from 'pages/AcceptInvitation';
import Appointments from 'pages/Appointments';
import Agents from 'pages/Agents';
import Account from 'pages/Account';
import Appointment from 'pages/Appointment';
import ProtectedLayout from 'shared/layouts/ProtectedLayout';
import ForgotPassword from 'pages/ForgotPassword';

import usePageTracking from 'shared/hooks/tracking-hook';

function App() {
  usePageTracking();

  return (
    <div className="static-wrapper">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="connexion" element={<Login />} />
          <Route
            path="reinitialiser-mot-de-passe"
            element={<ForgotPassword />}
          />
          <Route path="accept_invitation" element={<AcceptInvitation />} />
        </Route>

        <Route path="/mon-compte" element={<ProtectedLayout />}>
          <Route path="mes-rendez-vous" element={<Appointments />} />
          <Route
            path="mes-rendez-vous/:appointmentId"
            element={<Appointment />}
          />
          <Route path="agent" element={<Agents />} />
          <Route path="convict" element={<Account />} />
          <Route
            path="*"
            element={(
              <main style={{ padding: '1rem' }}>
                <p>404 page non trouvée</p>
              </main>
              )}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
