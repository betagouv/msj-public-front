const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_ONE_UPPERCASE = 'ONE_UPPERCASE';
const VALIDATOR_TYPE_ONE_DIGIT = 'ONE_DIGIT';
const VALIDATOR_TYPE_ONE_SPECIAL_CHAR = 'ONE_SPECIAL_CHAR';
const VALIDATOR_TYPE_IDENTICAL = 'IDENTICAL';
const VALIDATOR_TYPE_FRENCH_MOBILE_NUMBER = 'FRENCH_MOBILE_NUMBER';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val,
});

export const VALIDATOR_ONE_UPPERCASE = (val) => ({
  type: VALIDATOR_TYPE_ONE_UPPERCASE,
  val,
});

export const VALIDATOR_ONE_DIGIT = (val) => ({
  type: VALIDATOR_TYPE_ONE_DIGIT,
  val,
});

export const VALIDATOR_ONE_SPECIAL_CHAR = (val) => ({
  type: VALIDATOR_TYPE_ONE_SPECIAL_CHAR,
  val,
});

export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val });

export const VALIDATOR_IDENTICAL = (val) => ({
  type: VALIDATOR_TYPE_IDENTICAL,
  val,
});

export const VALIDATOR_FRENCH_MOBILE_NUMBER = (val) => ({
  type: VALIDATOR_TYPE_FRENCH_MOBILE_NUMBER,
  val,
});

export const validate = (value, validators) => {
  let isValid = true;

  validators.forEach((validator) => {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }

    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }

    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }

    if (validator.type === VALIDATOR_TYPE_ONE_UPPERCASE) {
      const re = /(?=.*?[A-Z])/;
      isValid = isValid && re.test(value);
    }

    if (validator.type === VALIDATOR_TYPE_ONE_DIGIT) {
      const re = /(?=.*?[0-9])/;
      isValid = isValid && re.test(value);
    }

    if (validator.type === VALIDATOR_TYPE_ONE_SPECIAL_CHAR) {
      const re = /(?=.*?[#?!@$%^&*-])/;
      isValid = isValid && re.test(value);
    }

    if (validator.type === VALIDATOR_TYPE_IDENTICAL) {
      isValid = validator.val === value;
    }

    if (validator.type === VALIDATOR_TYPE_FRENCH_MOBILE_NUMBER) {
      const re = /^(0)[6-7](\d{2}){4}$/;
      isValid = isValid && re.test(value);
    }
  });
  return isValid;
};
