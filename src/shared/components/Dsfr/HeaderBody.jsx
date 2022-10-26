import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useAuth } from 'shared/hooks/auth-hook';

import Logo from './Logo';
import Service from './Service';
import MSJLogo from './logo_msj.svg';
import HeaderContext from './HeaderContext';
import { Tool, ToolItem } from './Tool';

function HeaderBody({
  className,
}) {
  const navigate = useNavigate();
  const { onOpenNav, navButton, isOpenNav } = useContext(HeaderContext);

  const { logout, isLogin } = useAuth();

  const logoutHandler = (e) => {
    e.preventDefault();
    if (!isLogin) {
      return;
    }
    logout();
  };

  const goToAgentsApp = (e) => {
    e.preventDefault();
    window.location = process.env.REACT_APP_AGENTS_SIGN_IN_URL;
  };

  const goToPublicWebsite = (e) => {
    e.preventDefault();
    window.location = process.env.REACT_APP_SPINA_URL;
  };

  const goToLoginPage = (e) => {
    e.preventDefault();
    navigate('/connexion');
  };

  return (
    <div
      className="fr-header__body"
    >
      <div className="fr-container">
        <div className={classNames(className, 'fr-header__body-row')}>
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <Logo splitCharacter={10}>Ministère de la justice</Logo>
              </div>
              <div className="fr-header__operator">
                <img src={MSJLogo} alt="Ministère de la justice" />
              </div>
              <div className="fr-header__navbar">
                <button
                  onClick={() => {
                    console.log('open in body');
                    onOpenNav(!isOpenNav);
                  }}
                  type="button"
                  className="fr-btn--menu fr-btn"
                  title={navButton}
                  aria-label="ouvrir la navigation"
                >
                  {navButton}
                </button>
              </div>
            </div>
            <Service
              title="Mon espace personnel"
              description="Les infos utiles de mon parcours judiciaire"
            />
          </div>
          {isLogin ? (
            <Tool>
              <ToolItem icon="fr-fi-information-line" onClick={goToPublicWebsite} target="_blank">Revenir au site public</ToolItem>
              <ToolItem onClick={logoutHandler} icon="fr-fi-logout-box-r-line">
                Se déconnecter
              </ToolItem>
            </Tool>
          ) : (
            <Tool>
              <ToolItem icon="fr-fi-information-line" onClick={goToPublicWebsite} target="_blank">Revenir au site public</ToolItem>
              <ToolItem icon="fr-fi-information-line" onClick={goToAgentsApp} link="/landing" target="_blank">Espace agents</ToolItem>
              <ToolItem icon="fr-fi-information-line" onClick={goToLoginPage} target="_blank">Mon espace personnel</ToolItem>
            </Tool>
          )}
        </div>
      </div>
    </div>
  );
}

HeaderBody.defaultProps = {
  className: '',
};

HeaderBody.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default HeaderBody;
