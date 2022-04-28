import {
  ENTER_A_VALID_EMAIL,
  PASSWORD_CASE_CHECK,
  PASSWORD_DIGITS_CHECK,
  PASSWORD_SYMBOL_CHECK,
  PASSWORD_TOO_SHORT,
} from "../constants/errorMessage.consts";

export const emailValidate = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "";
  }
  return ENTER_A_VALID_EMAIL;
};

export const passwordStrengthCheck = (password) => {
  if (!(password && password.length > 6)) return PASSWORD_TOO_SHORT;
  let symbol = 0,
    uppercase = 0,
    lowercase = 0,
    digits = 0;
  for (let c of password) {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) uppercase++;
    else if (code >= 97 && code <= 122) lowercase++;
    else if (code >= 48 && code <= 57) digits++;
    else symbol++;
  }

  if (uppercase == 0 || lowercase == 0) return PASSWORD_CASE_CHECK;
  if (digits === 0) return PASSWORD_DIGITS_CHECK;
  if (symbol === 0) return PASSWORD_SYMBOL_CHECK;
  return "";
};
