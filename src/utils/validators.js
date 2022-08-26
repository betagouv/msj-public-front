const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'
const VALIDATOR_TYPE_MIN = 'MIN'
const VALIDATOR_TYPE_ONE_UPPERCASE = 'ONE_UPPERCASE'
const VALIDATOR_TYPE_ONE_DIGIT = 'ONE_DIGIT'
const VALIDATOR_TYPE_ONE_SPECIAL_CHAR = 'ONE_SPECIAL_CHAR'

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE })

export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
})

export const VALIDATOR_ONE_UPPERCASE = (val) => ({
  type: VALIDATOR_TYPE_ONE_UPPERCASE,
  val: val,
})

export const VALIDATOR_ONE_DIGIT = (val) => ({
  type: VALIDATOR_TYPE_ONE_DIGIT,
  val: val,
})

export const VALIDATOR_ONE_SPECIAL_CHAR = (val) => ({
  type: VALIDATOR_TYPE_ONE_SPECIAL_CHAR,
  val: val,
})

export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val })

export const validate = (value, validators) => {
  let isValid = true

  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0
    }

    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val
    }

    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val
    }

    if (validator.type === VALIDATOR_TYPE_ONE_UPPERCASE) {
      const re = new RegExp('(?=.*?[A-Z])')
      isValid = isValid && re.test(value)
    }

    if (validator.type === VALIDATOR_TYPE_ONE_DIGIT) {
      const re = new RegExp('(?=.*?[0-9])')
      isValid = isValid && re.test(value)
    }

    if (validator.type === VALIDATOR_TYPE_ONE_SPECIAL_CHAR) {
      const re = new RegExp('(?=.*?[#?!@$%^&*-])')
      isValid = isValid && re.test(value)
    }
  }
  return isValid
}
