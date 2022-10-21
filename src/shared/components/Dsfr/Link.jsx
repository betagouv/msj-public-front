import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
  className,
  as,
  current,
  onClick,
  size,
}) {
  const updatedClassName = classNames(className, {
    'fr-link': isSimple,
    [`fr-link--${size}`]: size,
  });
  const onClickLink = (e) => {
    e.preventDefault();
    onClick(e);
  };

  const asLink = as
    ? cloneElement(as, {
      className: updatedClassName,
      children,
      'aria-current': (current && 'page') || undefined,
      onClick,
    })
    : null;

  const link = (
    <a
      aria-disabled={(disabled || !href) ? true : undefined}
      role={disabled || !href ? 'link' : undefined}
      onClick={onClick ? (e) => onClickLink(e) : undefined}
      aria-current={current ? 'page' : undefined}
      href={href || undefined}
      title={title || undefined}
      target={target}
      rel={(target === '_blank') ? 'noopener noreferrer' : undefined}
      className={updatedClassName}
    >
      {children}
    </a>
  );
  return as ? asLink : link;
}

Link.defaultProps = {
  className: '',
  disabled: false,
  title: '',
  target: '_self',
  isSimple: false,
  current: false,
  as: null,
  href: '',
  children: '',
  onClick: null,
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
  as: PropTypes.element,
  title: PropTypes.string,
  target: PropTypes.string,
  isSimple: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  current: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Link;
