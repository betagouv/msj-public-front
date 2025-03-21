/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';

import useViewport from 'shared/hooks/useViewport';
import { useAuth } from 'shared/hooks/auth-hook';

import HeaderBody from './HeaderBody';
import HeaderContext from './HeaderContext';
import HeaderNav from './HeaderNav';
import Link from '../Link';

export default function Header({
  isOpenNav,
  className,
}: {
  isOpenNav?: boolean;
  className?: classNames.Argument;
}) {
  const [openNav, setOpenNav] = useState(isOpenNav ?? false);
  const { width } = useViewport();
  const location = useLocation();
  const [path, setPath] = useState(() => (location && location.pathname) || '');
  const { isLogin, user } = useAuth();

  const contextProps = useMemo(
    () => ({
      isOpenNav: !!openNav,
      onOpenNav: (open) => setOpenNav(open ?? !isOpenNav),
      isMobile: width < 992,
    }),
    [openNav, width, setOpenNav],
  );

  useEffect(() => {
    if (location && path !== location.pathname) {
      setPath(location.pathname);
    }
  }, [path, setPath, location]);

  return (
    <HeaderContext.Provider value={contextProps}>
      <header className={classNames(className, 'fr-header')} role="banner">
        <HeaderBody />
        <HeaderNav path={path}>
          {isLogin && (
            <>
              <Link
                onClick={() => setOpenNav(false)}
                as={<RouterLink to="/mon-compte/mes-convocations" />}
                className="fr-nav__link"
              >
                Mes convocations
              </Link>
              <Link
                onClick={() => setOpenNav(false)}
                current={path.startsWith('/agent')}
                as={<RouterLink to="/mon-compte/agent" />}
                className="fr-nav__link"
              >
                Mes interlocuteurs
              </Link>
              <Link
                onClick={() => setOpenNav(false)}
                current={path.startsWith('/convict')}
                as={<RouterLink to="/mon-compte/convict" />}
                className="fr-nav__link"
              >
                Mon compte
              </Link>
              <Link
                href="https://tally.so/r/3xZNPr"
                target="_blank"
                isExternal
                onClick={() => setOpenNav(false)}
                className="fr-nav__link"
              >
                Donner mon avis
              </Link>
              <Link
                href={`mailto:contact@mon-suivi-justice.beta.gouv.fr?subject=Demande%20d'aide%20interface%20probationnaire-${user.userId}`}
                target="_blank"
                isExternal
                onClick={(e) => {
                  e.preventDefault();
                  // eslint-disable-next-line no-alert
                  if (window.confirm("Êtes-vous sûr de vouloir contacter le support informatique Mon Suivi Justice ? Si vous souhaitez plutôt contacter votre CPIP, rendez-vous sur l'onglet \"Mes interlocuteurs\"")) {
                    window.location.href = `mailto:contact@mon-suivi-justice.beta.gouv.fr?subject=Demande%20d'aide%20interface%20probationnaire-${user.userId}`;
                  }
                  setOpenNav(false);
                }}
                className="fr-nav__link"
              >
                Contacter le support MSJ
              </Link>
            </>
          )}
        </HeaderNav>
      </header>
    </HeaderContext.Provider>
  );
}
