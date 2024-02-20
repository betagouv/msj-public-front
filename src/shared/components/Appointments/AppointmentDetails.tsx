import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppointmentData } from './type';

function AppointmentDetails({
  appointment: appointmentProps,
}: {
  appointment: AppointmentData;
}) {
  const location = useLocation();
  // eslint-disable-next-line operator-linebreak
  const appointment: AppointmentData | undefined =
    appointmentProps ?? location.state?.appointment;
  const {
    state: status,
    appointment_type_name: appointmentTypeName,
    place,
    datetime,
  } = appointment;
  const aptDate = new Date(datetime);
  const formattedDate = aptDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = aptDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const now = new Date();

  const days = (date1, date2) => {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.floor(difference / (1000 * 3600 * 24));
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

  let infoMessage = '';

  if (daysToApt >= 0 && status !== 'Annulé') {
    infoMessage = "N'oubliez pas de vous munir des justificatifs mentionnés dans votre convocation.";
  } else if (daysToApt < 0 && status === 'Manqué') {
    infoMessage = 'Vous avez manqué votre convocation. Cela fait partie de vos obligations judiciaires. Contactez dès que possible votre service de suivi.';
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
              Type de convocations
            </h3>
            <p className="text-md font-bold mb-0">{appointmentTypeName}</p>
          </div>
          <div className="sm:col-span-1">
            <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
              Date
            </h3>
            <p className="text-md font-bold mb-0">
              {`${formattedDate} à ${time}`}
            </p>
          </div>
          {place.adress === 'Multiple' ? null : (
            <div className="sm:col-span-1">
              <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                Adresse
              </h3>
              <p className="text-sm font-bold mb-0">
                {appointment.organization_name}
              </p>
              <p className="text-sm font-bold mb-0">{place.adress}</p>
              <a
                target="_blank"
                rel="noreferrer"
                className="font-bold text-xs text-msj-blue mt-1"
                href={`https://www.google.com/maps/search/?api=1&query=${place.adress}`}
              >
                Voir sur une carte
              </a>

              <p className="text-sm font-bold mb-0">
                <a href={`tel:${place.phone}`}>{place.phone}</a>
              </p>
            </div>
          )}
        </div>
        <p className="mt-8 mb-2 font-bold text-center">
          {infoMessage}
        </p>
      </div>
    </div>
  );
}

export default AppointmentDetails;
