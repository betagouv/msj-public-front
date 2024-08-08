/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';

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

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_URL,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
  environment: process.env.REACT_APP_SENTRY_ENV,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  usePageTracking();

  return (
    <div className="static-wrapper">
      <SentryRoutes>
        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<Navigate to="connexion" replace />} />
          <Route path="connexion" element={<Login />} />
          <Route
            path="reinitialiser-mot-de-passe"
            element={<ForgotPassword />}
          />
          <Route path="accept_invitation" element={<AcceptInvitation />} />
        </Route>

        <Route path="/mon-compte" element={<ProtectedLayout />}>
          <Route path="mes-convocations" element={<Appointments />} />
          <Route
            path="mes-convocations/:appointmentId"
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
      </SentryRoutes>
    </div>
  );
}

export default App;
