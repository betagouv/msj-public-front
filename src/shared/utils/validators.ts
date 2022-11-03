const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_ONE_UPPERCASE = 'ONE_UPPERCASE';
const VALIDATOR_TYPE_ONE_DIGIT = 'ONE_DIGIT';
const VALIDATOR_TYPE_ONE_SPECIAL_CHAR = 'ONE_SPECIAL_CHAR';
const VALIDATOR_TYPE_IDENTICAL = 'IDENTICAL';
const VALIDATOR_TYPE_FRENCH_MOBILE_NUMBER = 'FRENCH_MOBILE_NUMBER';

export const VALIDATOR_REQUIRE = () => ({
  type: VALIDATOR_TYPE_REQUIRE,
  errorHint: 'Ce champ ne peut pas être vide',

});

export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val,
});

export const VALIDATOR_ONE_UPPERCASE = (val) => ({
  type: VALIDATOR_TYPE_ONE_UPPERCASE,
  val,
  errorHint: 'Ajoutez au moins une majuscule',
});

export const VALIDATOR_ONE_DIGIT = (val) => ({
  type: VALIDATOR_TYPE_ONE_DIGIT,
  val,
  errorHint: 'Ajoutez au moins un chiffre',
});

export const VALIDATOR_ONE_SPECIAL_CHAR = (val) => ({
  type: VALIDATOR_TYPE_ONE_SPECIAL_CHAR,
  val,
  errorHint: 'Ajoutez au moins un caractère spécial',
});

export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val });

export const VALIDATOR_IDENTICAL = (val) => ({
  type: VALIDATOR_TYPE_IDENTICAL,
  val,
  errorHint: 'Les mots de passe doivent être identiques',
});

export const VALIDATOR_FRENCH_MOBILE_NUMBER = (val) => ({
  type: VALIDATOR_TYPE_FRENCH_MOBILE_NUMBER,
  val,
  errorHint: 'Saisissez numéro de protable français valide (en 06 ou 07)',
});

export const validate = (value, validators) => {
  let isValid = true;
  const errorHints = [];

  validators.forEach((validator) => {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      const ruleIsValid = value.trim().length > 0;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      const ruleIsValid = value.trim().length >= validator.val;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(`Ajoutez encore ${validator.val - value.trim().length} caractères`);
    }

    if (validator.type === VALIDATOR_TYPE_MIN) {
      const ruleIsValid = +value >= validator.val;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === VALIDATOR_TYPE_ONE_UPPERCASE) {
      const re = /(?=.*?[A-Z])/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === VALIDATOR_TYPE_ONE_DIGIT) {
      const re = /(?=.*?[0-9])/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === VALIDATOR_TYPE_ONE_SPECIAL_CHAR) {
      const re = /(?=.*?[#?!@$%^&*-])/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === VALIDATOR_TYPE_IDENTICAL) {
      const ruleIsValid = validator.val === value;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === VALIDATOR_TYPE_FRENCH_MOBILE_NUMBER) {
      const re = /^(0)[6-7](\d{2}){4}$/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }
  });
  return [isValid, errorHints];
};
