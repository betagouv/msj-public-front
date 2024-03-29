import React, { useContext } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'shared/hooks/auth-hook';

import HeaderContext from '../HeaderContext';
import ToolItem from './ToolItem';

function ToolItemGroup({ className }: { className?: classNames.Argument }) {
  const { isMobile } = useContext(HeaderContext);
  const { logout, isLogin } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    if (!isLogin) {
      return;
    }
    logout();
  };

  const goToLoginPage = (e) => {
    e.preventDefault();
    navigate('/connexion');
  };

  return (
    <div
      className={classNames(className, {
        'fr-header__tools-links': !isMobile,
        'fr-header__menu-links': isMobile,
      })}
    >
      <ul className="fr-links-group">
        {isLogin ? (
          <>
            <ToolItem
              icon="fr-fi-information-line"
              link={process.env.REACT_APP_SPINA_URL}
              target="_blank"
            >
              Revenir au site public
            </ToolItem>
            <ToolItem onClick={logoutHandler} icon="fr-fi-logout-box-r-line">
              Se déconnecter
            </ToolItem>
          </>
        ) : (
          <>
            <ToolItem
              icon="fr-fi-information-line"
              link={process.env.REACT_APP_SPINA_URL}
            >
              Revenir au site public
            </ToolItem>
            <ToolItem icon="fr-fi-lock-line" link={process.env.REACT_APP_AGENTS_SIGN_IN_URL}>
              Espace agents
            </ToolItem>
            <ToolItem icon="fr-fi-account-line" onClick={goToLoginPage}>
              Mon espace personnel
            </ToolItem>
          </>
        )}
      </ul>
    </div>
  );
}
export default ToolItemGroup;
