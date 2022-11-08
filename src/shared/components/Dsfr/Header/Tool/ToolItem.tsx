import classNames from 'classnames';
import React, { useContext } from 'react';

import Link from '../../Link';
import HeaderContext from '../HeaderContext';

interface ToolItemProps {
  className?: classNames.Argument;
  icon?: string;
  /**
   * html tag to render
   */
  as?: 'p' | 'span' | 'div';
  children: string | JSX.Element;
  link?: string;
  onClick?: (e: Event) => void;
  asLink?: JSX.Element;
  target?: string;
}

function ToolItem(props: ToolItemProps) {
  const {
    className = '',
    icon = '',
    link = '',
    asLink = null,
    as: HTMLTag = undefined,
    target = '_self',
    onClick = undefined,
    children,
  } = props;
  const { onOpenNav } = useContext(HeaderContext);

  const onClickToolItem = (e) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
    onOpenNav(false);
  };

  return (
    <li>
      {HTMLTag ? (
        <HTMLTag onClick={onClickToolItem} className={classNames(className)}>
          {children}
        </HTMLTag>
      ) : (
        <Link
          onClick={onClick ? onClickToolItem : undefined}
          as={asLink}
          target={target}
          className={className}
          isSimple
          display="flex"
          icon={icon}
          iconPosition="left"
          iconSize="1x"
          href={onClick && !link ? '/' : link}
        >
          {children}
        </Link>
      )}
    </li>
  );
}

export default ToolItem;
