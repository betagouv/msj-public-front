import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from './Icon';

/**
 *
 * @visibleName Link
 */
function Link({
  children,
  disabled,
  href,
  title,
  target,
  isSimple,
  className: defaultClassname,
  as,
  current,
  display,
  verticalIconPosition,
  iconSize,
  icon,
  iconPosition,
  onClick,
  size,
}) {
  const className = classNames(defaultClassname, {
    [`ds-fr--${display}`]: display && icon,
    'fr-link': isSimple,
    [`fr-link--${size}`]: size,
  });
  const onClickLink = (e) => {
    e.preventDefault();
    onClick(e);
  };

  const asLink = as
    ? cloneElement(as, {
      className,
      children,
      'aria-current': (current && 'page') || undefined,
      onClick,
    })
    : null;

  const linkElement = (
    <a
      aria-disabled={(disabled || !href) ? true : undefined}
      role={disabled || !href ? 'link' : undefined}
      onClick={onClick ? (e) => onClickLink(e) : undefined}
      aria-current={current ? 'page' : undefined}
      href={href || undefined}
      title={title || undefined}
      target={target}
      rel={(target === '_blank') ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </a>
  );
  const element = as ? asLink : linkElement;
  return icon ? (
    <Icon
      verticalAlign={verticalIconPosition}
      name={icon}
      size={iconSize}
      iconPosition={element.props && element.props.children ? iconPosition : 'center'}
    >
      {element}
    </Icon>
  ) : element;
}

Link.defaultProps = {
  className: '',
  disabled: false,
  title: '',
  target: '_self',
  isSimple: false,
  current: false,
  icon: '',
  as: null,
  iconPosition: 'right',
  href: '',
  children: '',
  onClick: null,
  display: 'inline',
  verticalIconPosition: 'middle',
  iconSize: 'sm',
  size: 'md',
};

Link.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  href: PropTypes.string,
  disabled: PropTypes.bool,
  verticalIconPosition: PropTypes.oneOf(['top', 'middle', 'sub']),
  as: PropTypes.element,
  title: PropTypes.string,
  target: PropTypes.string,
  isSimple: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  current: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.oneOf(['fw', 'xxs', 'xs', 'sm', '1x', 'lg', 'xl', '2x', '3x', '10x']),
  /**
     * @ignore
     */
  display: PropTypes.oneOf(['inline', 'flex']),
};

export default Link;
