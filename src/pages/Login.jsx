import { React, useReducer } from 'react';
import Checkbox from 'components/Forms/Checkbox';
import TextInput from 'components/Forms/TextInput';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_ONE_UPPERCASE,
  VALIDATOR_REQUIRE,
  VALIDATOR_ONE_DIGIT,
  VALIDATOR_ONE_SPECIAL_CHAR,
} from 'utils/validators';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
    {
      let formIsValid = true;
      Object.keys(state.inputs).forEach((inputId) => {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      });

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    default:
      return state;
  }
};

function Login() {
  const [formState, dispatch] = useReducer(formReducer, {
    isValid: false,
    inputs: {
      phoneNumber: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
  });

  const inputHandler = (id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value,
      isValid,
    });
    return true;
  };

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
          id="phoneNumber"
          required
          autoComplete="tel"
          onInput={(inputHandler)}
          errorMessage="Veuillez saisir un numéro de téléphone valide"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
        />

        <TextInput
          label="Mot de passe"
          id="password"
          required
          hint="10 caractères, avec une majuscule, un chiffre et un caractère spécial"
          autoComplete="current-password"
          errorMessage="Le mot de passe doit contenir 10 caractères, avec une majuscule, un chiffre et un caractère spécial"
          onInput={(inputHandler)}
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
        />

        <input
          type="submit"
          name="commit"
          value="Je me connecte"
          className="fr-btn mb-4"
          data-disable-with="Je me connecte"
          disabled={!formState.isValid}
        />
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
              <span
                className="fr-fi-mail-line icon-xl"
                aria-hidden="true"
              />
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
          {' '}
          <a target="_blank" href="/donnees_personnelles">
            la page dédiée
          </a>
        </div>
      </section>
    </div>
  );
}

export default Login;
