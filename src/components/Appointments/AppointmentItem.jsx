import React from 'react';
import { Link } from 'react-router-dom';

function AppointementItem({ item }) {
  return (
    <li className="col-span-1 fr-card fr-enlarge-link">
      <div className="fr-card__body">
        <h4 className="fr-card__title text-sm font-bold text-black">
          <Link to={`${item.id}`} className="fr-card__link">
            {item.date}
          </Link>
        </h4>
        <p className="fr-card__desc text-sm text-gray-700 mb-0">{item.place}</p>
      </div>
    </li>
  );
}

export default AppointementItem;
