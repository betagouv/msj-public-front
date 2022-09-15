import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Appointment() {
  const { appointmentId } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="fr-container fr-py-6w px-12 lg:px-32">
      <div className="bg-white shadow relative mb-8">
        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-600 text-white absolute -top-3.5">
            ID :
            {' '}
            {appointmentId}
            {' '}
            Dans 66 jours
          </span>
        </div>
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                Statut
              </h3>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gray-400 text-white">
                Planifié
              </span>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                Type de rendez-vous
              </h3>
              <p className="text-md font-bold mb-0">RDV de suivi SPIP</p>
            </div>
            <div className="sm:col-span-1">
              <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                Date
              </h3>
              <p className="text-md font-bold mb-0">
                Vendredi 28 octobre 2022 à 11h00
              </p>
            </div>
            <div className="sm:col-span-1">
              <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                Adresse
              </h3>
              <p className="text-sm font-bold mb-0">SPIP 92</p>
              <p className="text-sm font-bold mb-0">
                94 Boulevard du Général Leclerc, 92000 Nanterre
              </p>
              <p className="text-sm font-bold mb-0">+33606060606</p>
              <a
                target="_blank"
                rel="noreferrer"
                className="font-bold text-xs text-msj-blue mt-1"
                href="https://www.google.com/maps/search/?api=1&amp;query=SPIP+92,+94+Boulevard+du+Général+Leclerc,+92000+Nanterre"
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
      <div className="flex justify-center">
        <Link to="appointments">Retour à la liste</Link>
      </div>
    </div>
  );
}

export default Appointment;
