import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';

import { MatomoProvider } from '@jonkoops/matomo-tracker-react';
import App from './App';

import '@gouvfr/dsfr/dist/dsfr/dsfr.css';
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.css';
import '@gouvfr/dsfr/dist/utility/icons/icons-user/icons-user.css';
import '@gouvfr/dsfr/dist/utility/icons/icons-business/icons-business.css';

import '@gouvfr/dsfr/dist/dsfr.nomodule.min';

import 'remixicon/fonts/remixicon.css';
import './App.css';

import matomoInstance from './api/matomo.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MatomoProvider value={matomoInstance}>
      <Router>
        <App />
      </Router>
    </MatomoProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(() => {});
