import React, { useEffect, useState } from 'react';

import { useAuth } from 'shared/hooks/auth-hook';
import useHttpClient from 'shared/hooks/http-hook';

import AppointmentsList from 'shared/components/Appointments/AppointmentsList';
import AppointmentDetails from 'shared/components/Appointments/AppointmentDetails';
import Alert from 'shared/components/Alerts/Alert';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const futureAppointments = [];
  const pastAppointments = [];

  const { user } = useAuth();

  const {
    loading, error, sendRequest, clearError,
  } = useHttpClient();

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const resData = await sendRequest({
          url: `${process.env.REACT_APP_BACKEND_HOST}/api/appointments`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        setAppointments(resData?.data ?? []);
      } catch (err) {
        // TODO: how do we handle errors here ? (They are already handled in the http hook !)
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    fetchUserAppointments();
  }, [sendRequest]);

  if (appointments.length > 0) {
    appointments.sort((a, b) => {
      const aTime = new Date(a.datetime);
      const bTime = new Date(b.datetime);

      return aTime.getTime() - bTime.getTime();
    });

    appointments.forEach((apt) => {
      const aptDate = new Date(apt.datetime);

      if (aptDate.getTime() < Date.now()) {
        pastAppointments.push(apt);
      } else {
        futureAppointments.push(apt);
      }
    });
  }

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
            {futureAppointments.length === 0 && (
              <p>Vous n&apos;avez pas de rendez-vous à venir</p>
            )}

            {futureAppointments.length >= 1 && (
              <>
                <AppointmentDetails appointment={futureAppointments[0]} />
                <AppointmentsList
                  items={futureAppointments.slice(1)}
                  title="Rendez-vous suivants"
                />
              </>
            )}
            {pastAppointments.length >= 0 && (
              <AppointmentsList
                items={pastAppointments}
                title="Rendez-vous passés"
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Appointments;
