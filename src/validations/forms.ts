import { EMAIL_REGEX } from "../constants/constants";

export const emailPatternValidation = (value: string) => {
  return EMAIL_REGEX.test(value) || "Invalid mail format";
};

export const passwordsMustMatch = (password1: string, password2: string) => {
  return password1 === password2 || "Passwords don't match";
};
