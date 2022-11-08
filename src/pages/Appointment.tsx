import React from 'react';
import { Link } from 'react-router-dom';

import AppointmentDetails from 'shared/components/Appointments/AppointmentDetails';
import { AppointmentData } from 'shared/components/Appointments/type';

function Appointment({ appointment }: { appointment?: AppointmentData }) {
  return (
    <div className="fr-container fr-py-6w px-12 lg:px-32">
      <AppointmentDetails appointment={appointment} />
      <div className="flex justify-center">
        <Link to="/mon-compte/mes-rendez-vous">Retour à la liste</Link>
      </div>
    </div>
  );
}

export default Appointment;
