import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div
      className="fr-header__menu fr-modal"
      id="modal-851"
      aria-labelledby="button-852"
    >
      <div className="fr-container">
        <button type="button" className="fr-link--close fr-link" aria-controls="modal-851">
          Fermer
        </button>
        <nav
          className="fr-nav"
          id="navigation-850"
          role="navigation"
          aria-label="Menu principal"
        >
          <ul className="fr-nav__list">
            <li className="fr-nav__item">
              <Link to="appointments" className="fr-nav__link">
                Mes rendez-vous
              </Link>
            </li>
            <li className="fr-nav__item">
              <Link to="agent" className="fr-nav__link">
                Mes interlocuteurs
              </Link>
            </li>
            <li className="fr-nav__item">
              <Link to="convict" className="fr-nav__link">
                Mon compte
              </Link>
            </li>
          </ul>
        </nav>
        <div className="fr-header__menu-links" />
      </div>
    </div>
  );
}

export default Nav;
