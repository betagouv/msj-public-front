import { createInstance } from '@jonkoops/matomo-tracker-react';

const instance = createInstance({
  urlBase: 'http://localhost:5000',
  siteId: 233,
  userId: undefined, // optional, default value: `undefined`.
  trackerUrl: 'https://stats.data.gouv.fr/matomo.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'https://stats.data.gouv.fr/matomo.js', // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: false,
    setRequestMethod: 'POST',
  },
});

export default instance;
