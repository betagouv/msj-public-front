import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';

import { useAuth } from 'shared/hooks/auth-hook';

const usePageTracking = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { trackPageView, pushInstruction, enableLinkTracking } = useMatomo();

  enableLinkTracking();

  useEffect(() => {
    if (user) {
      pushInstruction('setUserId', user.msjId);
    }

    trackPageView();
  }, [location.pathname]);
};

export default usePageTracking;
