/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HeaderNav } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

import HeaderContext from './HeaderContext';
import Link from './Link';

export default function PrivateHeaderNav({ path }) {
  const { onOpenNav } = useContext(HeaderContext);
  return (
    <HeaderNav path={path}>
      <Link
        onClick={() => onOpenNav(false)}
        as={<RouterLink to="/mon-compte/mes-rendez-vous" />}
        className="fr-nav__link"
      >
        Mes rendez-vous
      </Link>
      <Link
        onClick={() => onOpenNav(false)}
        current={path.startsWith('/agent')}
        as={<RouterLink to="/mon-compte/agent" />}
        className="fr-nav__link"
      >
        Mes interlocuteurs
      </Link>
      <Link
        onClick={() => onOpenNav(false)}
        current={path.startsWith('/convict')}
        as={<RouterLink to="/mon-compte/convict" />}
        className="fr-nav__link"
      >
        Mon compte
      </Link>
    </HeaderNav>
  );
}

PrivateHeaderNav.defaultProps = {
  path: '',
};

PrivateHeaderNav.propTypes = {
  path: PropTypes.string,
};
