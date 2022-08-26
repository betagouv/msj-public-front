// Copyright (c) 2021 #dataESR

import { forwardRef, useRef, useReducer } from 'react'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import dataAttributes from 'utils/data-attributes'
import { validate } from 'utils/validators'


const textInputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      }
    default:
      return state
  }
}

/**
 *
 * @visibleName TextInput
 */
const TextInput = forwardRef((props, ref) => {
  const [textInputState, dispatch] = useReducer(textInputReducer, { value: '', isValid: null })

  const {
    textarea,
    type,
    label,
    hint,
    errorMessage,
    className,
    required,
    onBlur,
    validators,
    ...remainingProps
  } = props

  const onBlurHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      isValid: false,
      validators
    })
  }

  const computedStyle = textInputState.isValid ? 'valid' : 'error'

  const _classNameWrapper = classNames(
    'fr-input-group',
    {
      [`fr-input-group--${computedStyle}`]: textInputState.isValid !== null,
    },
    className
  )
  const _className = classNames('fr-input', {
    [`fr-input--${computedStyle}`]: textInputState.isValid !== null,
  })

  const inputId = useRef(uuidv4())
  const hintId = useRef(uuidv4())
  return (
    <div
      className={_classNameWrapper}
      {...dataAttributes.getAll(remainingProps)}
    >
      {label && (
        <label className="fr-label" htmlFor={inputId.current}>
          {label}
          {required && <span className="error"> *</span>}
          {hint && (
            <p className="fr-hint-text" id={hintId.current}>
              {hint}
            </p>
          )}
        </label>
      )}
      {textarea ? (
        <textarea
          {...dataAttributes.filterAll(remainingProps)}
          ref={ref}
          className={_className}
          id={inputId.current}
          defaultValue={textInputState.value}
          onBlur={onBlurHandler}
        />
      ) : (
        <input
          {...dataAttributes.filterAll(remainingProps)}
          aria-describedby={hint && hintId.current}
          ref={ref}
          type={type}
          className={_className}
          id={inputId.current}
          defaultValue={textInputState.value}
          onBlur={onBlurHandler}
        />
      )}

      {textInputState.isValid === false &&  (
        <p className={`fr-error-text`}>{ errorMessage }</p>
      )}
    </div>
  )
})

TextInput.defaultProps = {
  textarea: false,
  hint: '',
  label: null,
  errorMessage: '',
  className: '',
  type: 'text',
  required: false,
  validators: []
}

TextInput.propTypes = {
  type: PropTypes.oneOf(['date', 'text', 'number', 'password', 'email', 'tel']),
  textarea: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  validators: PropTypes.arrayOf(PropTypes.object),

}

export default TextInput
