import React, {
  useContext,
  cloneElement,
  Children,
  ReactNode,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import HeaderContext from './HeaderContext';
import { ToolItemGroup } from './Tool';

function HeaderNav({
  className = '',
  children,
  path,
}: {
  className?: classNames.Argument;
  children: ReactNode | ReactNode[];
  path?: string;
}) {
  const { isOpenNav, onOpenNav, isMobile } = useContext(HeaderContext);

  const updatedClassName = classNames(className, 'fr-header__menu fr-modal', {
    'fr-modal--opened': isOpenNav,
  });
  const childs = Children.toArray(children).map(
    // eslint-disable-next-line react/no-array-index-key
    (child, index) => cloneElement(child as ReactElement, { key: index, path }),
  );

  return (
    <div className={updatedClassName}>
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
          {children && <ul className="fr-nav__list">{childs}</ul>}
        </nav>
      </div>
    </div>
  );
}

export default HeaderNav;
