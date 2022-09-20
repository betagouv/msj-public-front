import React from 'react';
import * as PropTypes from 'prop-types';

import AppointementCard from './AppointmentCard';

function AppointmentsList({ items, title }) {
  return (
    <div className="my-10">
      <h1 className="text-xl">{title}</h1>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 pl-0">
        {items.map((appointment) => (
          <AppointementCard key={appointment.id} item={appointment} />
        ))}
      </ul>

    </div>
  );
}

AppointmentsList.defaultProps = {
  items: [],
  title: '',
};

AppointmentsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape),
  title: PropTypes.string,
};

export default AppointmentsList;
