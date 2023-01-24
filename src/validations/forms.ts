import { EMAIL_REGEX } from "../constants/constants";


export const emailPatternValidation = (value: string) => {
  return EMAIL_REGEX.test(value) || "Email must be in a valid format";
};
