import React, { cloneElement, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Icon.css';

/**
 *
 * @visibleName Icon
 */
function Icon({
  size,
  name,
  as,
  children,
  className: defaultClassname,
  iconPosition,
  title,
  verticalAlign,
  color,

}) {
  const iconRef = useRef();
  const HTMLTag = `${as}`;
  const className = classNames(
    `ri-${size}`,
    {
      [`icon-${iconPosition}`]: iconPosition !== 'center',
      [`ds-fr--v-${verticalAlign}`]: verticalAlign,
    },
    name,
    defaultClassname,
  );

  const isChildrenElement = children && children.props;
  const newChildren = isChildrenElement ? children.props.children : children;

  const icon = title ? (
    <HTMLTag
      ref={iconRef}
      className={className}
      title={title}
      aria-hidden={!!newChildren}
    />
  ) : (
    <HTMLTag
      ref={iconRef}
      className={className}
      aria-hidden={!!newChildren}
    />
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

  return isChildrenElement ? cloneElement(children, {
    ...children.props,
    className: children.props ? classNames({
      [`${children.props.className}`]: children.props.className,
    }) : '',
    children: childrenWithIcon,
  }) : childrenWithIcon;
}

Icon.defaultProps = {
  size: 'sm',
  color: '',
  as: 'span',
  className: '',
  verticalAlign: 'middle',
  iconPosition: 'left',
  children: null,
  title: '',
};

Icon.propTypes = {
  size: PropTypes.oneOf(['fw', 'xxs', 'xs', 'sm', '1x', 'lg', 'xl', '2x', '3x', '10x']),
  name: PropTypes.string.isRequired,
  verticalAlign: PropTypes.oneOf(['middle', 'sub', 'top']),
  className: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right', 'center']),
  as: PropTypes.oneOf(['span', 'i', 'div', 'p']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
  title: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
