import React from 'react';

import useForm from 'shared/hooks/form-hook';
import Checkbox from 'shared/components/Forms/Checkbox';
import TextInput from 'shared/components/Forms/TextInput';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_ONE_UPPERCASE,
  VALIDATOR_REQUIRE,
  VALIDATOR_ONE_DIGIT,
  VALIDATOR_ONE_SPECIAL_CHAR,
  VALIDATOR_FRENCH_MOBILE_NUMBER,
} from 'shared/utils/validators';
import { useAuth } from 'shared/hooks/auth-hook';
import useHttpClient from 'shared/hooks/http-hook';

import Alert from 'shared/components/Alerts/Alert';

function Login() {
  const { login } = useAuth();
  const {
    error, sendRequest, clearError,
  } = useHttpClient();

  const [formState, inputHandler] = useForm({
    phone: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
    convict_remember_me: {
      value: false,
      isValid: true,
    },
  }, false);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const resData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/login`,
      'POST',
      JSON.stringify({
        phone: formState.inputs.phone.value,
        password: formState.inputs.password.value,
      }),
      {
        'Content-Type': 'application/json',
      },
    );
    // TODO: how do we handle errors here ? (They are already handled in the http hook !)
    login(resData);
  };

  return (

    <>
      <Alert title={error?.message} show={!!error} type="error" closable onClose={clearError} />
      <div className="fr-container fr-py-6w px-12 lg:px-72">
        <h2 className="mb-4">Je me connecte</h2>
        <form
          acceptCharset="UTF-8"
          onSubmit={loginSubmitHandler}
        >
          <TextInput
            label="Numéro de téléphone"
            type="tel"
            id="phone"
            required
            hint="En 06 ou 07 (ex: 0612131415 ou 0612131415)"
            autoComplete="tel"
            onInput={inputHandler}
            errorMessage="Veuillez saisir un numéro de téléphone valide"
            maxlength="10"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_FRENCH_MOBILE_NUMBER()]}
          />

          <TextInput
            label="Mot de passe"
            id="password"
            required
            hint="10 caractères, avec une majuscule, un chiffre et un caractère spécial"
            autoComplete="current-password"
            errorMessage="Le mot de passe doit contenir 10 caractères, avec une majuscule, un chiffre et un caractère spécial"
            onInput={inputHandler}
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(10),
              VALIDATOR_ONE_UPPERCASE(),
              VALIDATOR_ONE_DIGIT(),
              VALIDATOR_ONE_SPECIAL_CHAR(),
            ]}
          />

          <Checkbox
            label="Se souvenir de moi ?"
            id="convict_remember_me"
            onChange={(e) => inputHandler(e.target.id, e.target.checked, true)}
          />

          <button
            type="submit"
            name="commit"
            className="fr-btn mb-4"
            data-disable-with="Je me connecte"
            disabled={!formState.isValid}
          >
            Je me connecte
          </button>
        </form>

        <a href="/convicts/password/new">J&apos;ai oublié mon mot de passe ?</a>
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
            <span
              className="fr-accordion__btn"
              aria-expanded="false"
              aria-controls="accordion-106"
              data-fr-js-collapse-span="true"
            >
              Mes données personnelles sont protégées
            </span>
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

    </>

  );
}

export default Login;
