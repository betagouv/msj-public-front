import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import ToolItemGroup from './ToolItemGroup';

export default function Tool({ className }) {
  const toolClassName = classNames('fr-header__tools', className);

  return (
    <div className={toolClassName}>
      <ToolItemGroup />
    </div>
  );
}

Tool.defaultProps = {
  className: '',
};

Tool.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
