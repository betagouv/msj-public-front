import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useForm from 'shared/hooks/form-hook';
import TextInput from 'shared/components/Forms/TextInput';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_FRENCH_MOBILE_NUMBER,
} from 'shared/utils/validators';
import useHttpClient from 'shared/hooks/http-hook';

import Alert from 'shared/components/Alerts/Alert';

function ForgotPassword() {
  const { error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      phone: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    await sendRequest({
      url: `${process.env.REACT_APP_BACKEND_HOST}/api/users/reset-password`,
      method: 'POST',
      body: JSON.stringify({
        phone: formState.inputs.phone.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/connexion', {
      state: {
        alertSuccess:
          'Un SMS avec un lien de réinitialisation de votre mot de passe vous a été envoyé',
      },
    });
    // TODO: how do we handle errors here ? (They are already handled in the http hook !)
  };

  return (
    <>
      <Alert
        title={error?.message}
        show={!!error}
        type="error"
        closable
        onClose={clearError}
      />
      <div className="fr-container fr-py-6w px-12 lg:px-72">
        <h2 className="mb-4">J&apos;ai oublié mon mot de passe ?</h2>
        <form acceptCharset="UTF-8" onSubmit={loginSubmitHandler}>
          <TextInput
            label="Numéro de téléphone"
            type="tel"
            id="phone"
            required
            hint="En 06 ou 07 (ex: 0612131415 ou 0612131415)"
            onInput={inputHandler}
            maxlength={10}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_FRENCH_MOBILE_NUMBER()]}
          />

          <button
            type="submit"
            name="commit"
            className="fr-btn mb-4"
            data-disable-with="Je me connecte"
            disabled={!formState.isValid}
          >
            Réinitialiser mon mot de passe
          </button>
        </form>

        <Link to="/connexion">Ecran de connexion</Link>
        <br />
      </div>
    </>
  );
}

export default ForgotPassword;
