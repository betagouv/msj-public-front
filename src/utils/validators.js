const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'
const VALIDATOR_TYPE_MIN = 'MIN'

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE })
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
})

export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val })

export const validate = (value, validators) => {
  console.log("on valide")
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
  }
  return isValid
}
