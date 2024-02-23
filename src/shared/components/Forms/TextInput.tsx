import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';

import { validate, Validator } from 'shared/utils/validators';

const textInputReducer = (state, action) => {
  let isValid;
  let errorHints;
  switch (action.type) {
    case 'CHANGE':
      [isValid, errorHints] = validate(action.val, action.validators);
      return {
        ...state,
        value: action.val,
        isValid,
        errorHints,
      };
    default:
      return state;
  }
};

type inputType = 'date' | 'text' | 'number' | 'password' | 'email' | 'tel';

interface TextInputProps {
  id: string;
  hint?: string;
  label?: string;
  type?: inputType;
  required: boolean;
  onInput: (id: TextInputProps['id'], value: string, isValid: boolean) => void;
  textarea?: boolean;
  maxlength?: number;
  validators: Validator[];
  password?: string;
}

/**
 *
 * @visibleName TextInput
 */
function TextInput(props: TextInputProps) {
  const [textInputState, dispatch] = useReducer(textInputReducer, {
    value: '',
    isValid: null,
    errorHints: [],
  });

  const {
    id,
    textarea = false,
    type = 'text',
    label,
    hint,
    required = false,
    validators = [],
    onInput,
    maxlength,
    password,
  } = props;

  const { value, isValid } = textInputState;

  const hintId = `hint_${id}`;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE',
      val: value,
      isValid: false,
      validators,
    });
  }, [password]);

  const onChangeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      isValid: false,
      validators,
    });
  };

  const computedStyle = textInputState.isValid ? 'valid' : 'error';

  const classNameWrapper = classNames('fr-input-group', {
    [`fr-input-group--${computedStyle}`]: textInputState.isValid !== null,
  });
  const className = classNames('fr-input', {
    [`fr-input--${computedStyle}`]: textInputState.isValid !== null,
  });

  return (
    <div className={classNameWrapper}>
      {label && (
        <label className="fr-label" htmlFor={id}>
          {label}
          {required && <span className="error"> *</span>}
          {hint && <p className="fr-hint-text">{hint}</p>}
        </label>
      )}
      {textarea ? (
        <textarea
          className={className}
          id={id}
          defaultValue={textInputState.value}
          onChange={onChangeHandler}
        />
      ) : (
        <input
          aria-describedby={hint && hintId}
          type={type}
          className={className}
          id={id}
          defaultValue={textInputState.value}
          onChange={onChangeHandler}
          maxLength={maxlength}
        />
      )}
      {textInputState.errorHints.length > 0
        && textInputState.errorHints.map((errorHint) => (
          <p className="fr-error-text" key={errorHint}>
            {errorHint}
          </p>
        ))}
    </div>
  );
}

export default TextInput;
