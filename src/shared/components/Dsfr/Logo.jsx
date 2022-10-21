import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from './Link';

/**
 *
 * @visibleName Logo
 */
function Logo({
  children, href, className, splitCharacter, hrefTitle, asLink,
}) {
  // TODO Better system to split
  const regex = new RegExp(`.{${splitCharacter.toString()}}\\S*\\s+`, 'g');
  const arrayStr = children.replace(regex, '$&@').split(/\s+@/);
  const title = arrayStr.reduce((el, a, i) => el.concat(
    a,
    i < arrayStr.length - 1
      // eslint-disable-next-line react/no-array-index-key
      ? <br key={i} />
      : '',
  ), []);

  return (
    <Link
      className={classNames(className, 'ds-fr--no-shadow')}
      as={asLink}
      title={hrefTitle || children}
      href={href}
    >
      <p className="fr-logo">
        {title}
      </p>
    </Link>
  );
}

Logo.defaultProps = {
  __TYPE: 'Logo',
  href: '/',
  hrefTitle: '',
  splitCharacter: 12,
  className: '',
  asLink: null,
};

Logo.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  __TYPE: 'Logo',
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hrefTitle: PropTypes.string,
  href: PropTypes.string,
  /**
  * Number of characters to split title
  */
  splitCharacter: PropTypes.number,
  asLink: PropTypes.element,
};

export default Logo;
