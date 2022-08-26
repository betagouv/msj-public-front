import React from 'react';

function Agents() {
  return (
    <div className="fr-container fr-py-6w px-12 lg:px-32">
      <h1 className="text-3xl">Les coordonnées de mes interlocuteurs</h1>
      <div className="bg-white shadow relative mb-8 p-8 lg:p-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="text-md font-bold mb-0">
            Vous êtes bien suivi par votre SPIP mais aucun CPIP référent ne
            vous a été affecté pour l&apos;instant
          </p>
        </div>
      </div>
    </div>
  );
}

export default Agents;
