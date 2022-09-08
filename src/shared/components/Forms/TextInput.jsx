import { React, useEffect, useReducer } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { validate } from 'shared/utils/validators';

const textInputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    default:
      return state;
  }
};

/**
 *
 * @visibleName TextInput
 */
function TextInput(props) {
  const [textInputState, dispatch] = useReducer(textInputReducer, {
    value: '',
    isValid: null,
  });

  const {
    id,
    textarea,
    type,
    label,
    hint,
    errorMessage,
    required,
    validators,
    onInput,
  } = props;

  const { value, isValid } = textInputState;

  const hintId = `hint_${id}`;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid]);

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
        />
      )}

      {textInputState.isValid === false && (
        <p className="fr-error-text">{errorMessage}</p>
      )}
    </div>
  );
}

TextInput.defaultProps = {
  textarea: false,
  hint: '',
  label: null,
  errorMessage: '',
  type: 'text',
  required: false,
  validators: [],
  onInput: null,
};

TextInput.propTypes = {
  type: PropTypes.oneOf(['date', 'text', 'number', 'password', 'email', 'tel']),
  id: PropTypes.string.isRequired,
  textarea: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.shape),
  onInput: PropTypes.func,
};

export default TextInput;
