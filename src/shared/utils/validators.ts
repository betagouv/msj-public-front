enum ValidatorType {
  Require = 'REQUIRE',
  Minlength = 'MINLENGTH',
  Min = 'MIN',
  OneUppercase = 'ONE_UPPERCASE',
  OneDigit = 'ONE_DIGIT',
  OneSpecialChar = 'ONE_SPECIAL_CHAR',
  Identical = 'IDENTICAL',
  FrenchMobileNumber = 'FRENCH_MOBILE_NUMBER',
}

export interface Validator {
  type: ValidatorType; 
  val?: string | number; 
  errorHint: string
}
type ValidatorFunc = (val?: string | number) => Validator
export const VALIDATOR_REQUIRE: ValidatorFunc = () => ({
  type: ValidatorType.Require,
  errorHint: 'Ce champ ne peut pas être vide',
});

export const VALIDATOR_MINLENGTH: ValidatorFunc = (val: number) => ({
  type: ValidatorType.Minlength,
  val,
  errorHint: `Ce champs doit contenir au moins ${val} caractères`
});

export const VALIDATOR_ONE_UPPERCASE: ValidatorFunc = () => ({
  type: ValidatorType.OneUppercase,
  errorHint: 'Ajoutez au moins une majuscule',
});

export const VALIDATOR_ONE_DIGIT: ValidatorFunc = () => ({
  type: ValidatorType.OneDigit,
  errorHint: 'Ajoutez au moins un chiffre',
});

export const VALIDATOR_ONE_SPECIAL_CHAR: ValidatorFunc = () => ({
  type: ValidatorType.OneSpecialChar,
  errorHint: 'Ajoutez au moins un caractère spécial',
});

export const VALIDATOR_MIN: ValidatorFunc = (val) => ({ type: ValidatorType.Min, val, errorHint: `La valeur doit être supérieur à ${val}` });

export const VALIDATOR_IDENTICAL: ValidatorFunc = (val) => ({
  type: ValidatorType.Identical,
  val,
  errorHint: 'Les mots de passe doivent être identiques',
});

export const VALIDATOR_FRENCH_MOBILE_NUMBER: ValidatorFunc = () => ({
  type: ValidatorType.FrenchMobileNumber,
  errorHint: 'Saisissez numéro de protable français valide (en 06 ou 07)',
});

export const validate = (value, validators) => {
  let isValid = true;
  const errorHints = [];

  validators.forEach((validator) => {
    if (validator.type === ValidatorType.Require) {
      const ruleIsValid = value.trim().length > 0;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === ValidatorType.Minlength) {
      const ruleIsValid = value.trim().length >= validator.val;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(`Ajoutez encore ${validator.val - value.trim().length} caractères`);
    }

    if (validator.type === ValidatorType.Min) {
      const ruleIsValid = +value >= validator.val;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === ValidatorType.OneUppercase) {
      const re = /(?=.*?[A-Z])/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === ValidatorType.OneDigit) {
      const re = /(?=.*?[0-9])/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === ValidatorType.OneSpecialChar) {
      const re = /(?=.*?[#?!@$%^&*-])/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === ValidatorType.Identical) {
      const ruleIsValid = validator.val === value;
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }

    if (validator.type === ValidatorType.FrenchMobileNumber) {
      const re = /^(0)[6-7](\d{2}){4}$/;
      const ruleIsValid = re.test(value);
      isValid = isValid && ruleIsValid;
      if (!ruleIsValid) errorHints.push(validator.errorHint);
    }
  });
  return [isValid, errorHints];
};
