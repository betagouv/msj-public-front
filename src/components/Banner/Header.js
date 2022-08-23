import React from "react";

import MSJLogo from "./logo_msj.svg"

const Header = () => {
    return (
        <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <p className="fr-logo">
                    Ministère de
                    <br />
                    la Justice
                  </p>
                </div>
                <div className="fr-header__navbar items-center">
                  <button
                    className="fr-btn--menu fr-btn"
                    data-fr-opened="false"
                    aria-controls="modal-851"
                    aria-haspopup="menu"
                    id="button-852"
                    title="Menu"
                  >
                    Menu
                  </button>
                </div>
              </div>
              <div className="fr-header__service">
                <img alt="Logo Mon Suivi Justice" src={MSJLogo} />
              </div>
            </div>

            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul className="fr-links-group">
                  <li></li>

                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header