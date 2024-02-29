import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';

import { useAuth } from 'shared/hooks/auth-hook';

const usePageTracking = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { trackPageView, pushInstruction, enableLinkTracking } = useMatomo();

  // re-scan the entire DOM for newly added links whenever the DOM changes
  enableLinkTracking();

  useEffect(() => {
    if (user) {
      pushInstruction('setUserId', user.userId);
    }

    trackPageView();
  }, [location.pathname]);
};

export default usePageTracking;
