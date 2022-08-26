import React from 'react';
import * as PropTypes from 'prop-types';

import AppointementItem from './AppointmentItem';

function AppointmentsList({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 pl-0">
      {items.map((appointment) => (
        <AppointementItem key={appointment.id} item={appointment} />
      ))}
    </ul>
  );
}

AppointmentsList.defaultProps = {
  items: [],
};

AppointmentsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape),
};

export default AppointmentsList;
