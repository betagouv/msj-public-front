import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

import HeaderContext from '../HeaderContext';

function ToolItemGroup({ children, className }) {
  const [menuLinkElement, setMenuLinkElement] = useState();
  const { isMobile, shortcutClassName } = useContext(HeaderContext);
  useEffect(() => {
    setMenuLinkElement(document.querySelector('.fr-header__menu .fr-links-group'));
  }, [shortcutClassName, setMenuLinkElement, menuLinkElement, isMobile]);
  const toolClassName = classNames('fr-header__tools', className);
  return (
    <div
      className={toolClassName}
    >
      <div
        className={classNames(className, 'fr-header__tools-links')}
      >
        {isMobile && menuLinkElement && createPortal(children, menuLinkElement)}
        <ul className="fr-links-group">
          {children}
        </ul>
      </div>
    </div>
  );
}
ToolItemGroup.defaultProps = {
  __TYPE: 'ToolItemGroup',
  className: '',
};

ToolItemGroup.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  __TYPE: 'ToolItemGroup',
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
export default ToolItemGroup;
