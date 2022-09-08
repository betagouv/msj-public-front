import React from 'react';

import PrivateHeader from './PrivateHeader';
import PrivateNav from './PrivateNav';

function PrivateBanner() {
  return (
    <header role="banner" className="fr-header">
      <PrivateHeader />
      <PrivateNav />
    </header>
  );
}

export default PrivateBanner;
