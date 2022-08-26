import React from 'react';
import AppointementItem from './AppointmentItem';

function AppointmentsList(props) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 pl-0">
      {props.items.map((appointment) => <AppointementItem key={appointment.id} item={appointment} />)}
    </ul>
  );
}

export default AppointmentsList;
