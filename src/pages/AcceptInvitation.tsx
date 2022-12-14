import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useForm from 'shared/hooks/form-hook';
import TextInput from 'shared/components/Forms/TextInput';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_ONE_UPPERCASE,
  VALIDATOR_ONE_DIGIT,
  VALIDATOR_ONE_SPECIAL_CHAR,
  VALIDATOR_IDENTICAL,
} from 'shared/utils/validators';
import { useAuth } from 'shared/hooks/auth-hook';

import Alert from 'shared/components/Alerts/Alert';

function AcceptInvitation() {
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get('token');

  const { login } = useAuth();

  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler] = useForm(
    {
      password: {
        value: '',
        isValid: false,
      },
      passwordConfirmation: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  const onCloseAlertHandler = () => {
    setError(null);
  };

  const acceptInvitationSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/api/users/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invitationToken,
            password: formState.inputs.password.value,
          }),
        },
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      // setIsLoading(false);
      login(resData);
    } catch (err) {
      // setIsLoading(false);
      setError(
        err ?? {
          message:
            "Une erreur s'est produite, contactez l'administrateur du site",
        },
      );
    }
  };

  return (
    <>
      <Alert
        title={error?.message}
        show={!!error}
        type="error"
        closable
        onClose={onCloseAlertHandler}
      />

      <div className="fr-container fr-py-4w px-12 lg:px-72">
        <h2 className="text-2xl mb-4">Je choisis mon mot de passe</h2>
        <form acceptCharset="UTF-8" onSubmit={acceptInvitationSubmitHandler}>
          <TextInput
            label="Mot de passe"
            type="password"
            id="password"
            hint="10 caract??res, avec une majuscule, un chiffre et un caract??re sp??cial"
            required
            onInput={inputHandler}
            validators={[
              VALIDATOR_MINLENGTH(10),
              VALIDATOR_ONE_UPPERCASE(),
              VALIDATOR_ONE_DIGIT(),
              VALIDATOR_ONE_SPECIAL_CHAR(),
            ]}
          />

          <TextInput
            label="Confirmation de mot de passe"
            type="password"
            id="passwordConfirmation"
            required
            onInput={inputHandler}
            validators={[VALIDATOR_IDENTICAL(formState.inputs.password.value)]}
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

        <h2 className="text-xl mb-4 mt-10">Mon compte est d??sormais actif</h2>

        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-6">
            <div className="fr-tile">
              <div className="fr-tile__body">
                <h5 className="fr-tile__title">
                  Je peux suivre mes rendez-vous
                </h5>
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
              Mes donn??es personnelles sont prot??g??es
            </button>
          </h3>
          <div
            className="fr-collapse"
            id="accordion-106"
            data-fr-js-collapse="true"
          >
            La pr??sente interface est ?? l&apos;initiative du Minist??re de la
            Justice. Le respect de vos droits et de votre vie priv??e est une
            priorit??. Pour plus d&apos;informations sur l&apos;utilisation de
            vos donn??es personnelles, vous pouvez vous rendre sur
            <a target="_blank" href="/donnees_personnelles">
              la page d??di??e
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default AcceptInvitation;
