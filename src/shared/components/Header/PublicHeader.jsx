import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Header,
  HeaderOperator,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
} from '@dataesr/react-dsfr';

import MSJLogo from './logo_msj.svg';

function PublicHeader() {
  const navigate = useNavigate();
  const goToAgentsApp = (e) => {
    e.preventDefault();
    window.location.replace(process.env.REACT_APP_AGENTS_SIGN_IN_URL);
  };

  const goToPublicWebsite = (e) => {
    e.preventDefault();
    window.location.replace(process.env.REACT_APP_SPINA_URL);
  };

  const goToLoginPage = (e) => {
    e.preventDefault();
    navigate('/connexion');
  };

  return (
    <Header>
      <HeaderBody>
        <Logo splitCharacter={10}>Ministère de la justice</Logo>
        <HeaderOperator>
          <img src={MSJLogo} alt="Ministère de la justice" />
        </HeaderOperator>
        <Service
          title="Mon espace personnel"
          description="Les infos utiles de mon parcours judiciaire"
        />
        <Tool
          closeButtonLabel="fermer"
        >
          <ToolItemGroup>
            <ToolItem icon="fr-fi-information-line" onClick={goToPublicWebsite} target="_blank">Revenir au site public</ToolItem>
            <ToolItem icon="fr-fi-information-line" onClick={goToAgentsApp} link="/landing" target="_blank">Espace agents</ToolItem>
            <ToolItem icon="fr-fi-information-line" onClick={goToLoginPage} target="_blank">Mon espace personnel</ToolItem>
          </ToolItemGroup>
        </Tool>
      </HeaderBody>
    </Header>
  );
}

export default PublicHeader;
