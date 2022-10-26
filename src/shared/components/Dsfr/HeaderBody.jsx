import React, { useContext } from 'react';
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
  const { onOpenNav, navButton } = useContext(HeaderContext);

  const { logout } = useAuth();

  const goToPublicWebsite = (e) => {
    e.preventDefault();
    window.location = process.env.REACT_APP_SPINA_URL;
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
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
                  onClick={onOpenNav}
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
          <Tool>
            <ToolItem icon="fr-fi-information-line" onClick={goToPublicWebsite} target="_blank">Revenir au site public</ToolItem>
            <ToolItem onClick={logoutHandler} icon="fr-fi-logout-box-r-line">
              Se déconnecter
            </ToolItem>
          </Tool>
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
