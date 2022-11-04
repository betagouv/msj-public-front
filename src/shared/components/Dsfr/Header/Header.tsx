/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState, useEffect } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import classNames from "classnames";

import useViewport from "shared/hooks/useViewport";
import { useAuth } from "shared/hooks/auth-hook";

import HeaderBody from "./HeaderBody";
import HeaderContext from "./HeaderContext";
import HeaderNav from "./HeaderNav";
import Link from "../Link";

export default function Header({
  isOpenNav,
  className,
}: {
  isOpenNav?: boolean;
  className: classNames.Argument;
}) {
  const [openNav, setOpenNav] = useState(isOpenNav ?? false);
  const { width } = useViewport();
  const location = useLocation();
  const [path, setPath] = useState(() => (location && location.pathname) || "");
  const { isLogin } = useAuth();

  const contextProps = useMemo(
    () => ({
      isOpenNav: !!openNav,
      onOpenNav: (open) => setOpenNav(open ?? !isOpenNav),
      isMobile: width < 992,
    }),
    [openNav, width, setOpenNav]
  );

  useEffect(() => {
    if (location && path !== location.pathname) {
      setPath(location.pathname);
    }
  }, [path, setPath, location]);

  return (
    <HeaderContext.Provider value={contextProps}>
      <header className={classNames(className, "fr-header")} role="banner">
        <HeaderBody />
        <HeaderNav path={path}>
          {isLogin && (
            <>
              <Link
                onClick={() => setOpenNav(false)}
                as={<RouterLink to="/mon-compte/mes-rendez-vous" />}
                className="fr-nav__link"
              >
                Mes rendez-vous
              </Link>
              <Link
                onClick={() => setOpenNav(false)}
                current={path.startsWith("/agent")}
                as={<RouterLink to="/mon-compte/agent" />}
                className="fr-nav__link"
              >
                Mes interlocuteurs
              </Link>
              <Link
                onClick={() => setOpenNav(false)}
                current={path.startsWith("/convict")}
                as={<RouterLink to="/mon-compte/convict" />}
                className="fr-nav__link"
              >
                Mon compte
              </Link>
            </>
          )}
        </HeaderNav>
      </header>
    </HeaderContext.Provider>
  );
}
