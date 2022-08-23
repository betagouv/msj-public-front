import React from "react";

const AcceptInvitation = () => {
  return (
    <div className="fr-container fr-py-4w px-12 lg:px-72">
      <h2 className="text-2xl mb-4">Je choisis mon mot de passe</h2>
      <form
        className="edit_convict"
        id="edit_convict"
        action="/convicts/invitation"
        accept-charset="UTF-8"
        method="post"
      >
        <input type="hidden" name="_method" value="put" autocomplete="off" />
        <input
          type="hidden"
          name="authenticity_token"
          value="fo4KVsj-xigHjHoS1r05kxRsKrrfzfTbG3kXOT9_T7gzmRi6h-289VcQObxC7-Whf-gTU9s9xRS6Jzcwm_y7cg"
          autocomplete="off"
        />

        <input
          readonly="readonly"
          autocomplete="off"
          type="hidden"
          value="5tunpx3PBp6s7UisWBgP"
          name="convict[invitation_token]"
          id="convict_invitation_token"
        />

        <label className="fr-label -mb-1" for="convict_password">
          Mot de passe
        </label>
        <div className="leading-none">
          <span className="text-xs text-gray-500">
            10 caractères, avec une majuscule, une chiffre et un caractère
            spécial
          </span>
        </div>
        <input
          autocomplete="current-password"
          className="fr-input mt-2 mb-4"
          type="password"
          name="convict[password]"
          id="convict_password"
        />

        <label className="fr-label" for="convict_password_confirmation">
          Confirmation du mot de passe
        </label>
        <input
          className="fr-input mb-4"
          type="password"
          name="convict[password_confirmation]"
          id="convict_password_confirmation"
        />

        <input
          type="submit"
          name="commit"
          value="Je valide"
          className="fr-btn"
          data-disable-with="Je valide"
        />
      </form>
      <h2 className="text-xl mb-4 mt-10">Mon compte est désormais actif</h2>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-6">
          <div className="fr-tile">
            <div className="fr-tile__body">
              <h5 className="fr-tile__title">Je peux suivre mes rendez-vous</h5>
            </div>
            <div className="fr-tile__img">
              <span
                className="fr-fi-calendar-line icon-xl"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </div>
        <div className="fr-col-6">
          <div className="fr-tile">
            <div className="fr-tile__body">
              <h5 className="fr-tile__title">
                Je peux contacter mes interlocuteurs
              </h5>
            </div>
            <div className="fr-tile__img">
              <span className="fr-fi-mail-line icon-xl" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>

      <section className="fr-accordion mt-8">
        <h3 className="fr-accordion__title">
          <button
            className="fr-accordion__btn"
            aria-expanded="false"
            aria-controls="accordion-106"
            data-fr-js-collapse-button="true"
          >
            Mes données personnelles sont protégées
          </button>
        </h3>
        <div className="fr-collapse" id="accordion-106" data-fr-js-collapse="true">
          La présente interface est à l’initiative du Ministère de la Justice.
          Le respect de vos droits et de votre vie privée est une priorité. Pour
          plus d’informations sur l’utilisation de vos données personnelles,
          vous pouvez vous rendre sur{" "}
          <a target="_blank" href="/donnees_personnelles">
            la page dédiée
          </a>
        </div>
      </section>
    </div>
  );
};

export default AcceptInvitation;
