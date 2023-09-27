import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import dataAttributes from 'shared/utils/data-attributes';

import '@gouvfr/dsfr/dist/component/alert/alert.css';

interface AlertProps {
  HtmlTitleTag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
  description?: string;
  type?: 'error' | 'success' | 'info';
  small?: boolean;
  role?: string;
  show?: boolean;
  closable?: boolean;
  onClose?: () => void;
  className?: classNames.Argument;
}

/**
 *
 * @visibleName Alert
 */
function Alert(props: AlertProps) {
  const {
    HtmlTitleTag = 'p',
    type = 'info',
    role = '',
    small = false,
    show = true,
    closable = false,
    className = '',
    title,
    description,
    onClose,
    ...remainingProps
  } = props;
  const [internalShow, setInternalShow] = useState(show);
  // eslint-disable-next-line no-underscore-dangle
  const _className = classNames(
    'fr-alert',
    `fr-alert--${type}`,
    {
      'fr-alert--sm': small,
    },
    className,
  );

  useEffect(() => {
    setInternalShow(show);
  }, [show]);

  if (!internalShow) {
    return null;
  }

  return (
    <div
      role={role || undefined}
      className={_className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dataAttributes.getAll(remainingProps)}
    >
      <HtmlTitleTag className="fr-alert__title">{title}</HtmlTitleTag>
      {!small && description && <p>{description}</p>}
      {closable && (
        <button
          type="button"
          className="fr-link--close fr-link"
          onClick={() => {
            setInternalShow(false);
            if (onClose) {
              onClose();
            }
          }}
        >
          Masquer le message
        </button>
      )}
    </div>
  );
}

export default Alert;
