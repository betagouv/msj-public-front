import React, { useContext } from 'react';
import classNames from 'classnames';

import Logo from '../Logo';
import Service from './Service';
import MSJLogo from './LogoMSJ';
import HeaderContext from './HeaderContext';
import { Tool } from './Tool';

function HeaderBody({ className = '' }: { className?: classNames.Argument }) {
  const { onOpenNav, navButton, isMobile } = useContext(HeaderContext);

  return (
    <div className="fr-header__body">
      <div className="fr-container">
        <div className={classNames(className, 'fr-header__body-row')}>
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <Logo splitCharacter={10}>Ministère de la justice</Logo>
              </div>
              <div className="fr-header__logo">
                <MSJLogo />
              </div>
              <div className="fr-header__navbar">
                <button
                  onClick={() => onOpenNav()}
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
          {!isMobile && <Tool />}
        </div>
      </div>
      <div className="fr-notice fr-notice--info">
        <div className="fr-container">
          <div className="fr-notice__body">
            <p>
              <span className="fr-notice__title">
                Attention, cette plateforme sera clôturée le 31 mars 2025. Il ne
                sera plus possible d&apos;y accéder par la suite. Merci de
                contacter votre CPIP si elle vous est utile.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBody;
