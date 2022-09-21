import React from 'react';
import { useLocation } from 'react-router-dom';
import * as PropTypes from 'prop-types';

function AppointmentDetails({ appointment }) {
  const location = useLocation();

  const status = location.state?.appointment.state || appointment.state;
  // eslint-disable-next-line max-len
  const appointmentTypeName = location.state?.appointment.appointment_type_name || appointment.appointment_type_name;
  const adress = location.state?.appointment?.place.adress || appointment.place.adress;
  const phone = location.state?.appointment?.place.phone || appointment.place.phone;

  const aptDate = new Date(location.state?.appointment.datetime || appointment.datetime);
  const formattedDate = aptDate.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const time = aptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const now = new Date();

  const days = (date1, date2) => {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const daysToApt = days(aptDate, now);

  let dayToAptMessage = '';

  if (daysToApt === 0) {
    dayToAptMessage = "Aujourd'hui";
  } else if (daysToApt > 0) {
    dayToAptMessage = `dans ${daysToApt} jours`;
  } else {
    dayToAptMessage = `Il y a ${Math.abs(daysToApt)} jours`;
  }

  return (
    <div className="bg-white shadow relative mb-8">
      <div className="flex justify-center">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-600 text-white absolute -top-3.5">
          {dayToAptMessage}
        </span>
      </div>
      <div className="p-8 lg:p-12">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
              Statut
            </h3>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gray-400 text-white">
              {status}
            </span>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
              Type de rendez-vous
            </h3>
            <p className="text-md font-bold mb-0">{appointmentTypeName}</p>
          </div>
          <div className="sm:col-span-1">
            <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
              Date
            </h3>
            <p className="text-md font-bold mb-0">
              {`${formattedDate}  à ${time}`}
            </p>
          </div>
          <div className="sm:col-span-1">
            <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
              Adresse
            </h3>
            <p className="text-sm font-bold mb-0">SPIP 92</p>
            <p className="text-sm font-bold mb-0">
              {adress}
            </p>
            <p className="text-sm font-bold mb-0">
              {' '}
              {phone}
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              className="font-bold text-xs text-msj-blue mt-1"
              href={`https://www.google.com/maps/search/?api=1&query=${adress}`}
            >
              Voir sur une carte
            </a>
          </div>
        </div>
        <p className="mt-8 mb-2 font-bold text-center">
          N&apos;oubliez pas de vous munir des justificatifs mentionnés dans votre
          convocation.
        </p>
      </div>
    </div>
  );
}

AppointmentDetails.defaultProps = {
  appointment: {},
};

AppointmentDetails.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number,
    datetime: PropTypes.string,
    state: PropTypes.string,
    appointment_type_name: PropTypes.string,
    place: PropTypes.shape({
      name: PropTypes.string,
      adress: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      contact_method: PropTypes.string,
    }),
  }),
};

export default AppointmentDetails;
