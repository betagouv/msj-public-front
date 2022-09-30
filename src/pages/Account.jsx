import React from 'react';

import { useAuth } from 'shared/hooks/auth-hook';

function Account() {
  const { user } = useAuth();

  return (
    <div className="fr-container fr-py-6w px-12 lg:px-32">
      <h1 className="text-3xl">Mes informations personnelles</h1>
      <div className="bg-white shadow relative mb-8 p-8 lg:p-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
            Nom
          </h3>
          <p className="text-md font-bold mb-0">{`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="sm:col-span-2">
          <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
            Numéro de téléphone
          </h3>
          <p className="text-md font-bold mb-0">{user.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
