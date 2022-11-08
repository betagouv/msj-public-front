import React from 'react';
import classNames from 'classnames';
import Link from '../Link';

interface ServiceProps {
  description?: string;
  title?: string;
  link?: string;
  className?: classNames.Argument;
  asLink?: JSX.Element;
}

function Service(props: ServiceProps) {
  const {
    className = '',
    description = 'Ouvrir le menu',
    link = '/',
    asLink,
    title,
  } = props;
  return (
    <div className={classNames(className, 'fr-header__service')}>
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

export default Service;
