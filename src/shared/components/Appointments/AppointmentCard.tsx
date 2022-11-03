import React from 'react';
import * as PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

function AppointementCard({ item }) {
  const date = new Date(item.datetime);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="col-span-1 fr-card fr-enlarge-link">

      <div className="fr-card fr-card--sm fr-enlarge-link">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title">
              <Link to={`${item.id}`} state={{ appointment: item }}>
                {`${formattedDate}  à ${time}`}
              </Link>
            </h3>
            <p className="fr-card__desc">{item.place.name}</p>
            <div className="fr-card__start">
              <ul className="fr-tags-group">
                <li>
                  <p className="fr-tag">{item.state}</p>
                </li>
              </ul>
              {/* <p className="fr-card__detail fr-icon-warning-fill">détail (optionnel)</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AppointementCard.defaultProps = {
  item: {},
};

AppointementCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    datetime: PropTypes.string,
    state: PropTypes.string,
    place: PropTypes.shape({
      name: PropTypes.string,
      adress: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      contact_method: PropTypes.string,
    }),
  }),
};

export default AppointementCard;
