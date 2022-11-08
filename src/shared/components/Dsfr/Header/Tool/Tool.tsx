import React from 'react';
import classNames from 'classnames';

import ToolItemGroup from './ToolItemGroup';

export default function Tool({
  className,
}: {
  className?: classNames.Argument;
}) {
  const toolClassName = classNames('fr-header__tools', className);

  return (
    <div className={toolClassName}>
      <ToolItemGroup />
    </div>
  );
}
