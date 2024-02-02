import React, { useEffect, useState, useMemo } from 'react';

import { useAuth } from 'shared/hooks/auth-hook';
import useHttpClient from 'shared/hooks/http-hook';

import AppointmentsList from 'shared/components/Appointments/AppointmentsList';
import AppointmentDetails from 'shared/components/Appointments/AppointmentDetails';
import Alert from 'shared/components/Alerts/Alert';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const { user } = useAuth();
  const {
    loading, error, sendRequest, clearError,
  } = useHttpClient();

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const responseData = await sendRequest({
          url: `${process.env.REACT_APP_BACKEND_HOST}/api/appointments`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        setAppointments(responseData?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserAppointments();
  }, [sendRequest, user.token]);

  const { futureAppointments, pastAppointments, canceledAppointments } = useMemo(() => {
    const now = Date.now();
    return appointments.reduce((acc, appointment) => {
      const appointmentDate = new Date(appointment.datetime).getTime();

      if (appointment.state === 'Annulé') {
        acc.canceledAppointments.push(appointment);
      } else if (appointmentDate < now) {
        acc.pastAppointments.push(appointment);
      } else {
        acc.futureAppointments.push(appointment);
      }

      return acc;
    }, { futureAppointments: [], pastAppointments: [], canceledAppointments: [] });
  }, [appointments]);

  return (
    <>
      <Alert
        title={error?.message || ''}
        show={!!error}
        type="error"
        closable
        onClose={clearError}
      />

      <div className="fr-container fr-py-6w px-12 lg:px-32">
        <h1 className="text-3xl">Vos rendez-vous</h1>
        {loading && <p>Chargement...</p>}

        {!loading && (
          <>
            {futureAppointments.length === 0 && <p>Vous n&apos;avez pas de rendez-vous à venir.</p>}

            {futureAppointments.length > 0 && (
              <>
                <AppointmentDetails appointment={futureAppointments[0]} />
                <AppointmentsList items={futureAppointments.slice(1)} title="Rendez-vous suivants" />
              </>
            )}

            {pastAppointments.length > 0 && (
              <AppointmentsList items={pastAppointments} title="Rendez-vous passés" />
            )}

            {canceledAppointments.length > 0 && (
              <AppointmentsList items={canceledAppointments} title="Rendez-vous annulés" />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Appointments;
