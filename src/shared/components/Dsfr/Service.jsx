import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from './Link';

function Service({
  title, description, className, link, asLink,
}) {
  return (
    <div
      className={classNames(className, 'fr-header__service')}
    >
      <Link
        as={asLink}
        className="fr-header__service-title"
        href={link}
        title={title}
      >
        {title}
      </Link>
      <p className="fr-header__service-tagline">{description}</p>
    </div>
  );
}

Service.defaultProps = {
  __TYPE: 'Service',
  className: '',
  description: 'Ouvrir le menu',
  link: '/',
  asLink: null,
};

Service.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  __TYPE: 'Service',
  description: PropTypes.node,
  title: PropTypes.node.isRequired,
  link: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  asLink: PropTypes.element,
};

export default Service;
