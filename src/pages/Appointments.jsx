import React, { useEffect, useState } from 'react';
import AppointmentsList from 'shared/components/Appointments/AppointmentsList';
import Alert from 'shared/components/Alerts/Alert';
import { useAuth } from 'shared/hooks/auth-hook';
import useHttpClient from 'shared/hooks/http-hook';

const APPOINTMENTS_LIST = [
  {
    id: 1,
    date: 'Vendredi 15 Septembre 10h00',
    place: 'SPIP 92',
  },
  {
    id: 2,
    date: 'Vendredi 15 Septembre 10h00',
    place: 'SPIP 92',
  },
  {
    id: 3,
    date: 'Vendredi 15 Septembre 10h00',
    place: 'SPIP 92',
  },
];

function Appointments() {
  const [appointments, setAppointments] = useState();

  const { user } = useAuth();
  const {
    loading, error, sendRequest, clearError,
  } = useHttpClient();

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_HOST}/api/appointments/${user.data.msjId}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
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

  if (APPOINTMENTS_LIST.length === 0) {
    return (
      <div className="my-10">
        <h1 className="text-xl">Vous n&apos;avez pas encore de rendez-vous</h1>
      </div>
    );
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
            <AppointmentsList
              items={appointments}
              title="Rendez-vous suivants"
            />
            <AppointmentsList items={appointments} title="Rendez-vous passés" />

          </>
          )}
      </div>
    </>
  );
}

export default Appointments;
