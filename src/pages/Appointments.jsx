import React, { useEffect, useState } from 'react';

import { useAuth } from 'shared/hooks/auth-hook';
import useHttpClient from 'shared/hooks/http-hook';

import AppointmentsList from 'shared/components/Appointments/AppointmentsList';
import AppointmentDetails from 'shared/components/Appointments/AppointmentDetails';
import Alert from 'shared/components/Alerts/Alert';

function Appointments() {
  const [appointments, setAppointments] = useState(null);

  const futureAppointments = [];
  const pastAppointments = [];

  const { user } = useAuth();

  const {
    loading, error, sendRequest, clearError,
  } = useHttpClient();

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_HOST}/api/appointments/${user.msjId}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        );
        setAppointments(resData);
      } catch (err) {
        // TODO: how do we handle errors here ? (They are already handled in the http hook !)
        console.log(err);
      }
    };
    fetchUserAppointments();
  }, [sendRequest]);

  if (appointments) {
    appointments.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    appointments.forEach((apt) => {
      const aptDate = new Date(apt.datetime);

      if (aptDate < Date.now()) {
        pastAppointments.push(apt);
      } else {
        futureAppointments.push(apt);
      }
    });
  }

  return (
    <>
      <Alert title={error?.message || ''} show={!!error} type="error" closable onClose={clearError} />

      <div className="fr-container fr-py-6w px-12 lg:px-32">
        <h1 className="text-3xl">Vos rendez-vous</h1>
        {loading && <p>Chargement...</p>}

        {!loading && appointments
          && (
          <>
            <AppointmentDetails appointment={futureAppointments[0]} />
            <AppointmentsList
              items={futureAppointments}
              title="Rendez-vous suivants"
            />
            <AppointmentsList items={pastAppointments} title="Rendez-vous passés" />

          </>
          )}
      </div>
    </>
  );
}

export default Appointments;
