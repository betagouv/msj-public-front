import React from "react";

const Login = () => {
  return (
    <div class="fr-container fr-py-6w px-12 lg:px-72">
      <h2 class="mb-4">Je me connecte</h2>
      <form
        class="new_convict"
        id="new_convict"
        action="/convicts/sign_in"
        accept-charset="UTF-8"
        method="post"
      >
        <input
          type="hidden"
          name="authenticity_token"
          value=""
          autocomplete="off"
        />

        <label class="fr-label" for="convict_phone">
          Numéro de téléphone
        </label>
        <input
          autocomplete="tel"
          class="fr-input mb-6"
          type="tel"
          name="convict[phone]"
          id="convict_phone"
        />

        <label class="fr-label" for="convict_password">
          Mot de passe
        </label>
        <input
          autocomplete="current-password"
          class="fr-input mb-4"
          type="password"
          name="convict[password]"
          id="convict_password"
        />

        <div class="fr-checkbox-group mb-4">
          <input
            name="convict[remember_me]"
            type="hidden"
            value="0"
            autocomplete="off"
          />
          <input
            type="checkbox"
            value="1"
            name="convict[remember_me]"
            id="convict_remember_me"
          />
          <label class="fr-label" for="convict_remember_me">
            Se souvenir de moi ?
          </label>
        </div>

        <input
          type="submit"
          name="commit"
          value="Je me connecte"
          class="fr-btn mb-4"
          data-disable-with="Je me connecte"
        />
      </form>

      <a href="/convicts/password/new">J'ai oublié mon mot de passe ?</a>
      <br />

      <h2 class="text-xl mb-4 mt-10">Ce que mon compte me permet</h2>

      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-6">
          <div class="fr-tile">
            <div class="fr-tile__body">
              <h5 class="fr-tile__title">Je peux suivre mes rendez-vous</h5>
            </div>
            <div class="fr-tile__img">
              <span
                class="fr-fi-calendar-line icon-xl"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </div>
        <div class="fr-col-6">
          <div class="fr-tile">
            <div class="fr-tile__body">
              <h5 class="fr-tile__title">
                Je peux contacter mes interlocuteurs
              </h5>
            </div>
            <div class="fr-tile__img">
              <span class="fr-fi-mail-line icon-xl" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>

      <section class="fr-accordion mt-8">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            aria-expanded="false"
            aria-controls="accordion-106"
            data-fr-js-collapse-button="true"
          >
            Mes données personnelles sont protégées
          </button>
        </h3>
        <div class="fr-collapse" id="accordion-106" data-fr-js-collapse="true">
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

export default Login;
