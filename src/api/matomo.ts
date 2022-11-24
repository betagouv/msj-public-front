import { createInstance } from '@jonkoops/matomo-tracker-react';

const instance = createInstance({
  urlBase: `${process.env.REACT_APP_MATOMO_BASE_URL}/`,
  siteId: +process.env.REACT_APP_MATOMO_SITE_ID,
  linkTracking: false, // better for SPA. (Outbound links tracking done via enableLinkTracking)
  configurations: {
    disableCookies: true,
    setSecureCookie: false,
    setRequestMethod: 'POST',
  },
});

export default instance;
