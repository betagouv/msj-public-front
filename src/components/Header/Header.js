import React from "react";
import MSJLogo from "./logo_msj.svg"

const Header = () => {
  return (
    <header role="banner" class="fr-header">
      <div class="fr-header__body">
        <div class="fr-container">
          <div class="fr-header__body-row">
            <div class="fr-header__brand fr-enlarge-link">
              <div class="fr-header__brand-top">
                <div class="fr-header__logo">
                  <p class="fr-logo">
                    Ministère de
                    <br />
                    la Justice
                  </p>
                </div>
                <div class="fr-header__navbar items-center">
                  <button
                    class="fr-btn--menu fr-btn"
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
              <div class="fr-header__service">
                <img alt="Logo Mon Suivi Justice" src={MSJLogo} />
              </div>
            </div>

            <div class="fr-header__tools">
              <div class="fr-header__tools-links">
                <ul class="fr-links-group">
                  <li></li>

                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
