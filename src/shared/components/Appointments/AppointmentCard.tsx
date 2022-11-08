import React from 'react';

import { Link } from 'react-router-dom';
import { AppointmentData } from './type';

function AppointementCard({ item }: { item: AppointmentData }) {
  const date = new Date(item.datetime);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="col-span-1 fr-card fr-enlarge-link">
      <div className="fr-card fr-card--sm fr-enlarge-link">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title">
              <Link to={`${item.id}`} state={{ appointment: item }}>
                {`${formattedDate} à ${time}`}
              </Link>
            </h3>
            <p className="fr-card__desc">{item.place.name}</p>
            <div className="fr-card__start">
              <ul className="fr-tags-group">
                <li>
                  <p className="fr-tag">{item.state}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointementCard;
