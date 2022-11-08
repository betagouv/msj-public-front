import React, { useEffect, useState } from 'react';

import { useAuth } from 'shared/hooks/auth-hook';
import useHttpClient from 'shared/hooks/http-hook';

import Alert from 'shared/components/Alerts/Alert';

interface Agent {
  organizationName: string;
  firstname: string;
  lastname: string;
  email: string;
}
function agentDataToAgent(agentData: any): Agent {
  return {
    organizationName: agentData.organization_name,
    firstname: agentData.first_name,
    lastname: agentData.last_name,
    email: agentData.email,
  };
}
function Agents() {
  const [agent, setAgent] = useState<Agent | null>(null);

  const { user } = useAuth();

  const {
    loading, error, sendRequest, clearError,
  } = useHttpClient();

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_HOST}/api/users/${user.msjId}/cpip`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        );
        setAgent(agentDataToAgent(resData));
      } catch (err) {
        // TODO: how do we handle errors here ? (They are already handled in the http hook !)
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    fetchAgent();
  }, [sendRequest]);

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
        <h1 className="text-3xl">Les coordonnées de mes interlocuteurs</h1>
        <div className="bg-white shadow relative mb-8 p-8 lg:p-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          {loading && <p>Chargement...</p>}

          {!loading && agent && (
            <>
              <div className="sm:col-span-2">
                <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                  Nom du service
                </h3>
                <p className="text-md font-bold mb-0">
                  {agent.organizationName}
                </p>
              </div>
              <div className="sm:col-span-2">
                <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                  Mon CPIP référent
                </h3>
                <p className="text-md font-bold mb-0">{`${agent.firstname} ${agent.lastname}`}</p>
              </div>
              <div className="sm:col-span-1">
                <h3 className="text-xs mb-0 font-medium text-msj-blue uppercase mb-1">
                  Email
                </h3>
                <a
                  className="text-md font-bold mb-0"
                  href="mailto:johan.goncalves@coleurope.eu"
                >
                  {agent.email}
                </a>
              </div>
            </>
          )}
          {!loading && !agent && (
            <div className="sm:col-span-2">
              <p className="text-md font-bold mb-0">
                Vous êtes bien suivi par votre SPIP mais aucun CPIP référent ne
                vous a été affecté pour l&apos;instant
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Agents;
