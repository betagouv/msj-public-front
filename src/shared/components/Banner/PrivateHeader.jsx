import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from 'shared/hooks/auth-hook';

import {
  Header,
  HeaderOperator,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
  HeaderNav,
  NavItem,
} from '@dataesr/react-dsfr';

import MSJLogo from './logo_msj.svg';

function PrivateHeader() {
  const location = useLocation();
  const [path, setPath] = useState(() => location.pathname || '');

  const { logout } = useAuth();

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (path !== location.pathname) {
      setPath(location.pathname);
    }
  }, [path, setPath, location]);

  return (
    <Header>
      <HeaderBody>
        <Logo splitCharacter={10}>Ministère de la justice</Logo>
        <HeaderOperator>
          <img src={MSJLogo} alt="Ministère de la justice" />
        </HeaderOperator>
        <Service
          title="Guichet unique du probationnaire"
          description="Les infos utiles de mon parcours judiciaire"
        />
        <Tool
          closeButtonLabel="fermer"
        >
          <ToolItemGroup>
            <ToolItem icon="fr-fi-information-line" link="/landing" target="_blank">Revenir au site public</ToolItem>
            <ToolItem onClick={logoutHandler} icon="fr-fi-logout-box-r-line">
              Se déconnecter
            </ToolItem>
          </ToolItemGroup>
        </Tool>
      </HeaderBody>
      <HeaderNav path={path}>
        <NavItem
          title="Mes rendez-vous"
          asLink={<RouterLink to="/mon-compte/mes-rendez-vous" />}
        />
        <NavItem
          title="Mes interlocuteurs"
          current={path.startsWith('/agent')}
          asLink={<RouterLink to="/mon-compte/agent" />}
        />
        <NavItem
          title="Mon compte"
          current={path.startsWith('/convict')}
          asLink={<RouterLink to="/mon-compte/convict" />}
        />
      </HeaderNav>
    </Header>
  );
}

export default PrivateHeader;
