/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect } from 'react';
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
import { useAuth } from 'shared/hooks/auth-hook';
import { getMatomoUrl, getSentryUrl } from 'shared/utils/env';

Sentry.init({
  dsn: getSentryUrl(),
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

type MatomoWindow = Window & {_mtm: any[]};

function App() {
  const { user } = useAuth();

  useEffect(() => {
    const matomoUrl = getMatomoUrl();

    if (!matomoUrl) { return; }
    const matomoWindow = window as unknown as MatomoWindow;
    // eslint-disable-next-line no-underscore-dangle, no-multi-assign, no-trailing-spaces
    const _mtm = matomoWindow._mtm = matomoWindow._mtm || [];
    if (_mtm.length > 0) { return; }

    if (user?.userId) {
      _mtm.push({ setUserId: user.userId });
    }
    _mtm.push({ 'mtm.startTime': (new Date().getTime()), event: 'mtm.Start' });
    const d = document; const g = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = matomoUrl; s.parentNode.insertBefore(g, s);
  }, []);

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
