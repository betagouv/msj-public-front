import React from 'react';
import AppointmentsList from 'components/Appointments/AppointmentsList';

const APPOINTMENTS_LIST = [
  {
    id: '1',
    date: 'Vendredi 15 Septembre 10h00',
    place: 'SPIP 92',
  },
  {
    id: '2',
    date: 'Vendredi 15 Septembre 10h00',
    place: 'SPIP 92',
  },
  {
    id: '3',
    date: 'Vendredi 15 Septembre 10h00',
    place: 'SPIP 92',
  },
];

function Appointments() {
  if (APPOINTMENTS_LIST.length === 0) {
    return (
      <div className="my-10">
        <h1 className="text-xl">Vous n&apos;avez pas encore de rendez-vous</h1>
      </div>
    );
  }

  return (
    <div className="fr-container fr-py-6w px-12 lg:px-32">
      <h1 className="text-3xl">Vos rendez-vous</h1>
      <AppointmentsList
        items={APPOINTMENTS_LIST}
        title="Rendez-vous suivants"
      />
      <AppointmentsList
        items={APPOINTMENTS_LIST}
        title="Rendez-vous passés"
      />
    </div>
  );
}

export default Appointments;
