import React from "react";
import Checkbox from "../components/Forms/Checkbox";
import TextInput from "../components/Forms/TextInput";

const Login = () => {
  return (
    <div className="fr-container fr-py-6w px-12 lg:px-72">
      <h2 className="mb-4">Je me connecte</h2>
      <form
        className="new_convict"
        id="new_convict"
        action="/convicts/sign_in"
        acceptCharset="UTF-8"
        method="post"
      >
        <TextInput
          label="Numéro de téléphone"
          type="tel"
          id="convict_phone"
          required={true}
          autoComplete="tel"
        ></TextInput>

        <TextInput
          label="Mot de passe"
          id="convict_password"
          required={true}
          hint="10 caractères, avec une majuscule, un chiffre et un caractère spécial"
          autoComplete="current-password"
        ></TextInput>

        <Checkbox
          label="Se souvenir de moi ?"
          id="convict_remember_me"
        ></Checkbox>

        <input
          type="submit"
          name="commit"
          value="Je me connecte"
          className="fr-btn mb-4"
          data-disable-with="Je me connecte"
        />
      </form>

      <a href="/convicts/password/new">J'ai oublié mon mot de passe ?</a>
      <br />

      <h2 className="text-xl mb-4 mt-10">Ce que mon compte me permet</h2>

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
              <span
                className="fr-fi-mail-line icon-xl"
                aria-hidden="true"
              ></span>
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
        <div
          className="fr-collapse"
          id="accordion-106"
          data-fr-js-collapse="true"
        >
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
