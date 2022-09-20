import React from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import AppointmentDetails from 'shared/components/Appointments/AppointmentDetails';

function Appointment({ appointment }) {
  return (
    <div className="fr-container fr-py-6w px-12 lg:px-32">
      <AppointmentDetails appointment={appointment} />
      <div className="flex justify-center">
        <Link to="/mon-compte/mes-rendez-vous">Retour à la liste</Link>
      </div>
    </div>
  );
}

Appointment.defaultProps = {
  appointment: {},
};

Appointment.propTypes = {
  appointment: PropTypes.shape({
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

export default Appointment;
