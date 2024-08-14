export const getMatomoUrl = (): string => {
  const { REACT_APP_MATOMO_BASE_URL, REACT_APP_MATOMO_CONTAINER } = process.env;
  if (!REACT_APP_MATOMO_BASE_URL || !REACT_APP_MATOMO_CONTAINER) {
    return null;
  }

  return `${REACT_APP_MATOMO_BASE_URL}/${REACT_APP_MATOMO_CONTAINER}`;
};
export const getSentryUrl = (): string => {
  const { REACT_APP_SENTRY_URL } = process.env;
  if (!REACT_APP_SENTRY_URL) {
    return null;
  }

  return `${REACT_APP_SENTRY_URL}`;
};
