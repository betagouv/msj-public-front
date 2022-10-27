import React, { useContext, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import HeaderContext from './HeaderContext';
import { ToolItemGroup } from './Tool';

function HeaderNav({
  className, children, path,
}) {
  const {
    isOpenNav, onOpenNav, isMobile,
  } = useContext(HeaderContext);

  const updatedClassName = classNames(className, 'fr-header__menu fr-modal', {
    'fr-modal--opened': isOpenNav,
  });
  const childs = Children.toArray(children).map(
    // eslint-disable-next-line react/no-array-index-key
    (child, index) => cloneElement(child, { key: index, path: path || undefined }),
  );

  return (
    <div
      className={updatedClassName}
    >
      <div className="fr-container">
        <button
          onClick={() => onOpenNav(false)}
          title="fermer"
          className="fr-link--close fr-link"
          type="button"
          aria-label="fermer la navigation"
        >
          Fermer
        </button>
        {isMobile && <ToolItemGroup />}
        <nav
          id="header-navigation"
          className="fr-nav"
          role="navigation"
          aria-label="Menu principal"
        >
          {children && (
          <ul className="fr-nav__list">
            {childs}
          </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

HeaderNav.defaultProps = {
  __TYPE: 'HeaderNav',
  className: '',
  path: '',
};

HeaderNav.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  __TYPE: 'HeaderNav',
  path: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default HeaderNav;
