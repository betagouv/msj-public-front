import React from 'react';

function AcceptInvitation() {
  return (
    <div className="fr-container fr-py-4w px-12 lg:px-72">
      <h2 className="text-2xl mb-4">Je choisis mon mot de passe</h2>
      <form
        className="edit_convict"
        id="edit_convict"
        action="/convicts/invitation"
        acceptCharset="UTF-8"
        method="post"
      >
        {/*

        Rails specific  code that will be removed

        <input type="hidden" name="_method" value="put" autocomplete="off" />
        <input
          type="hidden"
          name="authenticity_token"
          value=""
          autocomplete="off"
        />

        <input
          readonly="readonly"
          autocomplete="off"
          type="hidden"
          value=""
          name="convict[invitation_token]"
          id="convict_invitation_token"
        /> */}

        <div className="leading-none">
          <span className="text-xs text-gray-500">
            10 caractères, avec une majuscule, une chiffre et un caractère
            spécial
          </span>
        </div>
        <input
          autoComplete="current-password"
          className="fr-input mt-2 mb-4"
          type="password"
          name="convict[password]"
          id="convict_password"
        />

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
              />
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
              <span className="fr-fi-mail-line icon-xl" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <section className="fr-accordion mt-8">
        <h3 className="fr-accordion__title">
          <button
            type="button"
            className="fr-accordion__btn"
            aria-expanded="false"
            aria-controls="accordion-106"
            data-fr-js-collapse-button="true"
          >
            Mes données personnelles sont protégées
          </button>
        </h3>
        <div
          className="fr-collapse"
          id="accordion-106"
          data-fr-js-collapse="true"
        >
          La présente interface est à l’initiative du Ministère de la Justice.
          Le respect de vos droits et de votre vie privée est une priorité. Pour
          plus d’informations sur l’utilisation de vos données personnelles,
          vous pouvez vous rendre sur
          {' '}
          <a target="_blank" href="/donnees_personnelles">
            la page dédiée
          </a>
        </div>
      </section>
    </div>
  );
}

export default AcceptInvitation;
