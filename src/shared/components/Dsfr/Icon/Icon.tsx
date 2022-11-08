import React, { cloneElement, useEffect, useRef } from 'react';
import classNames from 'classnames';

import './Icon.css';

interface IconProps {
  size?: 'fw' | 'xxs' | 'xs' | 'sm' | '1x' | 'lg' | 'xl' | '2x' | '3x' | '10x';
  name: string;
  verticalAlign: 'middle' | 'sub' | 'top';
  className?: classNames.Argument;
  iconPosition: 'left' | 'right' | 'center';
  as?: 'span' | 'i' | 'div' | 'p';
  children: JSX.Element | string;
  title?: string;
  color?: string;
}

/**
 *
 * @visibleName Icon
 */
function Icon(props: IconProps) {
  const {
    size = 'sm',
    color = '',
    as: HTMLTag = 'span',
    className: defaultClassname = '',
    verticalAlign = 'middle',
    iconPosition = 'left',
    children = null,
    title = '',
    name,
  } = props;
  const iconRef = useRef(null);
  const className = classNames(
    `ri-${size}`,
    {
      [`icon-${iconPosition}`]: iconPosition !== 'center',
      [`ds-fr--v-${verticalAlign}`]: verticalAlign,
    },
    name,
    defaultClassname,
  );

  const isChildrenElement = typeof children !== 'string';
  const newChildren = isChildrenElement ? children.props.children : children;

  const icon = title ? (
    <HTMLTag
      ref={iconRef}
      className={className}
      title={title}
      aria-hidden={!!newChildren}
    />
  ) : (
    <HTMLTag ref={iconRef} className={className} aria-hidden={!!newChildren} />
  );

  const childrenWithIcon = (
    <>
      {iconPosition === 'right' ? newChildren : icon}
      {iconPosition === 'right' ? icon : newChildren}
    </>
  );

  useEffect(() => {
    if (color && iconRef.current) {
      iconRef.current.style.color = `${color}`;
    }
  }, [color]);

  return isChildrenElement
    ? cloneElement(children, {
      ...children.props,
      className: children.props
        ? classNames({
          [`${children.props.className}`]: children.props.className,
        })
        : '',
      children: childrenWithIcon,
    })
    : childrenWithIcon;
}

export default Icon;
