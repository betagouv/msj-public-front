import React from 'react';
// import { useSearchParams } from 'react-router-dom';

import useForm from 'shared/hooks/form-hook';
import TextInput from 'shared/components/Forms/TextInput';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_ONE_UPPERCASE,
  VALIDATOR_REQUIRE,
  VALIDATOR_ONE_DIGIT,
  VALIDATOR_ONE_SPECIAL_CHAR,
  VALIDATOR_IDENTICAL,
} from 'shared/utils/validators';

function AcceptInvitation() {
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');

  const [formState, inputHandler] = useForm({
    password: {
      value: '',
      isValid: false,
    },
    passwordConfirmation: {
      value: '',
      isValid: false,
    },
  }, false);

  const acceptInvitationSubmitHandler = (e) => {
    e.preventDefault();
  };

  console.log(formState);

  return (
    <div className="fr-container fr-py-4w px-12 lg:px-72">
      <h2 className="text-2xl mb-4">Je choisis mon mot de passe</h2>

      <form
        acceptCharset="UTF-8"
        onSubmit={acceptInvitationSubmitHandler}
      >
        <TextInput
          label="Mot de passe"
          type="password"
          id="password"
          hint="10 caractères, avec une majuscule, un chiffre et un caractère spécial"
          required
          autoComplete="current-password"
          onInput={inputHandler}
          errorMessage="Le mot de passe doit contenir 10 caractères, avec une majuscule, un chiffre et un caractère spécial"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(10),
            VALIDATOR_ONE_UPPERCASE(),
            VALIDATOR_ONE_DIGIT(),
            VALIDATOR_ONE_SPECIAL_CHAR(),
          ]}
        />

        <TextInput
          label="Confirmation de mot de passe"
          id="passwordConfirmation"
          required
          autoComplete="current-password"
          errorMessage="Les mots de passe ne correspondent pas"
          onInput={inputHandler}
          validators={[
            VALIDATOR_IDENTICAL(formState.password),
          ]}
        />

        <button
          type="submit"
          name="commit"
          className="fr-btn mb-4"
          data-disable-with="Je valide"
          disabled={!formState.isValid}
        >
          Je valide
        </button>
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
          <a target="_blank" href="/donnees_personnelles">
            la page dédiée
          </a>
        </div>
      </section>
    </div>
  );
}

export default AcceptInvitation;
