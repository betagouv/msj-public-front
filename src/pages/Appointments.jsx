import React, { useEffect, useState } from 'react';
import AppointmentsList from 'shared/components/Appointments/AppointmentsList';
import Alert from 'shared/components/Alerts/Alert';
import { useAuth } from 'shared/hooks/auth-hook';

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
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState();

  const { user } = useAuth();

  const onCloseAlertHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/appointments/${user.data.msjId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        setAppointments(resData);
      } catch (err) {
        setIsLoading(false);
        setError(err || "Une erreur s'est produite, contactez l'administrateur du site");
      }
      setIsLoading(false);
    };
    fetchUserAppointments();
  }, []);

  if (APPOINTMENTS_LIST.length === 0) {
    return (
      <div className="my-10">
        <h1 className="text-xl">Vous n&apos;avez pas encore de rendez-vous</h1>
      </div>
    );
  }

  return (
    <>
      {loading && <p>Chargement...</p>}

      <Alert title={error?.message || ''} show={!!error} type="error" closable onClose={onCloseAlertHandler} />

      <div className="fr-container fr-py-6w px-12 lg:px-32">
        <h1 className="text-3xl">Vos rendez-vous</h1>
        <AppointmentsList
          items={appointments}
          title="Rendez-vous suivants"
        />
        <AppointmentsList items={appointments} title="Rendez-vous passés" />
      </div>

    </>
  );
}

export default Appointments;
