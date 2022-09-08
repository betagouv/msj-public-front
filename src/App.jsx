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

function App() {
  return (
    <div className="static-wrapper">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="sign_in" element={<Login />} exact />
          <Route
            path="accept_invitation"
            element={<AcceptInvitation />}
            exact
          />
        </Route>

        <Route path="/mon_compte" element={<ProtectedLayout />}>
          <Route path="appointments" element={<Appointments />} exact />
          <Route
            path="appointments/:appointmentId"
            element={<Appointment />}
          />
          <Route path="agent" element={<Agents />} exact />
          <Route path="convict" element={<Account />} exact />
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
