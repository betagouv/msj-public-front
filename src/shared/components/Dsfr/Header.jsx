import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useAuth } from 'shared/hooks/auth-hook';
import useViewport from 'shared/hooks/useViewport';

import HeaderBody from './HeaderBody';
import HeaderContext from './HeaderContext';
import PrivateHeaderNav from './PrivateHeaderNav';

export default function Header({ isOpenNav, className }) {
  const [openNav, setOpenNav] = useState(isOpenNav || false);
  const { width } = useViewport();
  const location = useLocation();
  const [path, setPath] = useState(() => (location && location.pathname) || '');
  const { isLogin } = useAuth();

  const contextProps = useMemo(() => ({
    isOpenNav: !!openNav,
    onOpenNav: (open) => setOpenNav(open),
    isMobile: width < 992,
  }), [openNav, width, setOpenNav]);

  useEffect(() => {
    if (location && path !== location.pathname) {
      setPath(location.pathname);
    }
  }, [path, setPath, location]);

  return (
    <HeaderContext.Provider value={contextProps}>
      <header
        className={classNames(className, 'fr-header')}
        role="banner"
      >
        <HeaderBody path={path} />
        { isLogin && <PrivateHeaderNav /> }
      </header>
    </HeaderContext.Provider>
  );
}

Header.defaultProps = {
  className: '',
  isOpenNav: false,
};

Header.propTypes = {
  /**
   * Ouverture de la popin de navigation en mobile
   */
  isOpenNav: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
