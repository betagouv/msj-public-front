import React from 'react';

import AppointementCard from './AppointmentCard';
import { AppointmentData } from './type';

function AppointmentsList({
  items = [],
  title = '',
}: {
  items: AppointmentData[];
  title: string;
}) {
  let appointments;

  if (items.length > 0) {
    appointments = items.map((appointment) => (
      <AppointementCard key={appointment.id} item={appointment} />
    ));
  } else {
    appointments = "Vous n'avez pas d'autre convocation à venir.";
  }

  return (
    <div className="my-10">
      <h1 className="text-xl">{title}</h1>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 pl-0">
        {appointments}
      </ul>
    </div>
  );
}

export default AppointmentsList;
