import React from "react";

const Agents = () => {
  return (
    <>
      <div class="fr-container fr-py-6w px-12 lg:px-32">
        <h1 class="text-3xl">Les coordonnées de mes interlocuteurs</h1>
        <div class="bg-white shadow relative mb-8 p-8 lg:p-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <p class="text-md font-bold mb-0">
              Vous êtes bien suivi par votre SPIP mais aucun CPIP référent ne
              vous a été affecté pour l'instant
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agents